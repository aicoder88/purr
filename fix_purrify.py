import requests

ZONE_ID = "7874a773838423403332036643272635"
EMAIL = "iptmim@gmail.com"
API_KEY = "2c57148b9ab7b0d04f0ef05053b551b42f520"

headers = {
    "X-Auth-Email": EMAIL, 
    "X-Auth-Key": API_KEY, 
    "Content-Type": "application/json"
}

def fix():
    # 1. Get the Entrypoint Ruleset (this contains your Custom Rules/WAF)
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/rulesets/phases/http_request_firewall_custom/entrypoint"
    resp = requests.get(url, headers=headers).json()
    
    if not resp.get("success"):
        print(f"❌ Could not find WAF entrypoint: {resp.get('errors')}")
        return

    ruleset = resp.get("result", {})
    ruleset_id = ruleset.get("id")
    rules = ruleset.get("rules", [])

    # 2. Find your "Protect Vercel Bill" rule
    target_rule = next((r for r in rules if "Protect Vercel Bill" in r.get("description", "")), None)

    if not target_rule:
        print("❌ Could not find the rule 'Protect Vercel Bill' in your dashboard.")
        return

    # 3. Update the rule to include Croatia (HR) and Known Bots
    rule_id = target_rule["id"]
    update_url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/rulesets/{ruleset_id}/rules/{rule_id}"
    
    new_data = {
        "description": "Protect Vercel Bill: Allow CA, US, HR and Bots",
        "expression": '(not ip.geoip.country in {"CA" "US" "HR"} and not cf.client.bot and not http.request.uri.path contains ".well-known")',
        "action": "managed_challenge"
    }

    update_resp = requests.patch(update_url, headers=headers, json=new_data).json()
    
    if update_resp.get("success"):
        print("✅ SUCCESS! Croatia (HR) and Uptime Monitors are now whitelisted.")
        print("Go ahead and refresh Purrify.ca—the challenge should be gone!")
    else:
        print(f"❌ Update failed: {update_resp.get('errors')}")

if __name__ == "__main__":
    fix()
