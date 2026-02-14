import requests

# --- YOUR CREDENTIALS ---
EMAIL = "iptmim@gmail.com"
API_KEY = "bb239ecb582a7b61ca1aa757f9f31bc96164f"
# ------------------------

# ALLOWED COUNTRIES: US (United States), CA (Canada)
# LOGIC: If Country is NOT US AND NOT CA -> BLOCK
ALLOWED = '{"US" "CA"}'

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": API_KEY,
    "Content-Type": "application/json"
}

def lock_down():
    print(f"🚀 Locking down everything to US & Canada only...")
    
    # 1. Get all zones
    zones = requests.get("https://api.cloudflare.com/client/v4/zones?per_page=50", headers=headers).json()
    if not zones.get("success"):
        print(f"❌ Login Failed: {zones.get('errors')[0]['message']}")
        return

    for zone in zones['result']:
        z_id = zone['id']
        z_name = zone['name']
        print(f"🛡️  Securing {z_name}...")

        # 2. Get WAF Entry Point
        waf_url = f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/phases/http_request_firewall_custom/entrypoint"
        waf_resp = requests.get(waf_url, headers=headers).json()
        
        if waf_resp.get("success"):
            ruleset_id = waf_resp['result']['id']
            
            # 3. OVERWRITE/CREATE RULE
            # Logic: (ip.src.country ne "US" and ip.src.country ne "CA")
            # Cloudflare expression: (not ip.src.country in {"US" "CA"})
            
            rule_payload = {
                "action": "block",
                "description": "Block Non-North America",
                "expression": f"(not ip.src.country in {ALLOWED})",
                "enabled": True
            }
            
            deploy_url = f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/{ruleset_id}/rules"
            deploy = requests.post(deploy_url, headers=headers, json=rule_payload)
            
            if deploy.status_code in [200, 201]:
                print(f"    ✅ ONLY US/CA ALLOWED NOW.")
            else:
                print(f"    ⚠️ Note: {deploy.text}")
        else:
            print(f"    ⚠️ Skipped (No WAF access)")

if __name__ == "__main__":
    lock_down()
