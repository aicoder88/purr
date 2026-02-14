import requests

# Credentials provided by user
API_TOKEN = "HiissonUJNogEteIqR94BzLxbbPpM3qZcbZAssM-"
ACCOUNT_ID = "adab47b0e1de759ceeafe5711fdfebe6"

# SE: Sweden, HK: Hong Kong, JP: Japan, IN: India, BR: Brazil
COUNTRIES = '{"SE", "HK", "JP", "IN", "BR"}'
RULE_NAME = "Automated Global Bot Block"

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

def apply_block():
    print("🛰️ Fetching all domains from Cloudflare...")
    zones_url = "https://api.cloudflare.com/client/v4/zones"
    zones_resp = requests.get(zones_url, headers=headers).json()

    if not zones_resp.get("success"):
        print(f"❌ Error: {zones_resp.get('errors')}")
        return

    for zone in zones_resp.get("result", []):
        zone_id = zone['id']
        print(f"🛡️ Processing {zone['name']}...")
        ruleset_url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_custom/entrypoint"
        rs_resp = requests.get(ruleset_url, headers=headers).json()
        
        if rs_resp.get("success"):
            ruleset_id = rs_resp['result']['id']
            rule_data = {
                "action": "block",
                "description": RULE_NAME,
                "expression": f"ip.src.country in {COUNTRIES}",
                "enabled": True
            }
            add_url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules"
            requests.post(add_url, headers=headers, json=rule_data)
            print(f"   ✅ BLOCK RULE DEPLOYED")

if __name__ == "__main__":
    apply_block()
