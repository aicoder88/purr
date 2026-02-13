import requests
import json

# --- YOUR CREDENTIALS ---
EMAIL = "iptmim@gmail.com"
API_KEY = "bb239ecb582a7b61ca1aa757f9f31bc96164f"
# ------------------------

# FIXED: Spaces instead of commas
COUNTRIES = '{"SE" "HK" "JP" "IN" "BR" "CN" "SG"}'

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": API_KEY,
    "Content-Type": "application/json"
}

def fix_traffic():
    print(f"🚀 Connecting to Cloudflare...")
    
    # 1. Fetch all zones
    zones = requests.get("https://api.cloudflare.com/client/v4/zones?per_page=50", headers=headers).json()
    if not zones.get("success"):
        print(f"❌ Login Failed: {zones.get('errors')[0]['message']}")
        return

    print(f"✅ Found {len(zones['result'])} websites. Securing them...\n")

    for zone in zones['result']:
        z_id = zone['id']
        z_name = zone['name']
        print(f"🛡️  Processing {z_name}...")

        # 2. Get WAF Entry Point
        waf_url = f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/phases/http_request_firewall_custom/entrypoint"
        waf_resp = requests.get(waf_url, headers=headers).json()
        
        ruleset_id = None

        # If the WAF ruleset exists, get its ID.
        if waf_resp.get("success"):
            ruleset_id = waf_resp['result']['id']
        else:
            # If it doesn't exist, we must create it (This fixes the "Could not access" error)
            print(f"    ⚠️ WAF not initialized. Creating it...")
            create_url = f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets"
            create_payload = {
                "name": "Custom Rules",
                "kind": "zone",
                "phase": "http_request_firewall_custom"
            }
            create_resp = requests.post(create_url, headers=headers, json=create_payload).json()
            if create_resp.get("success"):
                ruleset_id = create_resp['result']['id']
            else:
                print(f"    ❌ Failed to create WAF: {create_resp.get('errors')[0]['message']}")
                continue

        # 3. Push the Block Rule
        if ruleset_id:
            rule_payload = {
                "action": "block",
                "description": "Global Bot Block (SE/HK/JP/IN/BR/CN/SG)",
                "expression": f"ip.src.country in {COUNTRIES}",
                "enabled": True
            }
            
            deploy_url = f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/{ruleset_id}/rules"
            deploy = requests.post(deploy_url, headers=headers, json=rule_payload)
            
            if deploy.status_code in [200, 201]:
                print(f"    ✅ SECURED")
            else:
                # Check if it failed because the rule already exists
                err_msg = deploy.text
                if "duplicate" in err_msg.lower():
                    print(f"    ✅ Already secured (Rule exists)")
                else:
                    print(f"    ⚠️ Error: {err_msg}")

if __name__ == "__main__":
    fix_traffic()
