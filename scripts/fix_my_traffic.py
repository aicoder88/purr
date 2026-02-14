import requests

TOKEN = "HiissonUJNogEteIqR94BzLxbbPpM3qZcbZAssM-"
COUNTRIES = '{"SE", "HK", "JP", "IN", "BR"}'

headers = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def run():
    # 1. Get every site in your account
    zones = requests.get("https://api.cloudflare.com/client/v4/zones", headers=headers).json()
    if not zones.get("success"):
        print("❌ Token issue. Please make sure your Cloudflare token has 'Zone:Read' and 'WAF:Edit' permissions.")
        return

    for zone in zones['result']:
        z_id, z_name = zone['id'], zone['name']
        print(f"🛡️ Protecting {z_name}...")
        
        # 2. Find the WAF settings
        rs = requests.get(f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/phases/http_request_firewall_custom/entrypoint", headers=headers).json()
        if rs.get("success"):
            rs_id = rs['result']['id']
            # 3. Slam the door shut
            rule = {
                "action": "block",
                "description": "Stop Bot Drain",
                "expression": f"ip.src.country in {COUNTRIES}",
                "enabled": True
            }
            requests.post(f"https://api.cloudflare.com/client/v4/zones/{z_id}/rulesets/{rs_id}/rules", headers=headers, json=rule)
            print(f"   ✅ Done!")

run()
