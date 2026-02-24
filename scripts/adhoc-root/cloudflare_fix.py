import requests

# Your credentials
API_KEY = "2c57148b9ab7b0d04f0ef05053b551b42f520"
EMAIL = "iptmim@gmail.com"

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": API_KEY,
    "Content-Type": "application/json",
}

def get_ruleset_id(zone_id):
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets"
    response = requests.get(url, headers=headers)
    result = response.json().get("result", [])
    for rs in result:
        if rs.get("phase") == "http_request_firewall_custom":
            return rs.get("id")
    return None

def create_ruleset(zone_id):
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets"
    data = {
        "name": "default",
        "kind": "zone",
        "phase": "http_request_firewall_custom",
        "rules": []
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json().get("result", {}).get("id")

def add_rule_to_ruleset(zone_id, ruleset_id, zone_name):
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules"
    data = {
        "description": "Protect Vercel Bill: Challenge non-CA/US traffic",
        "expression": '(ip.geoip.country ne "CA" and ip.geoip.country ne "US" and not http.request.uri.path contains ".well-known")',
        "action": "managed_challenge",
        "enabled": True
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code in [200, 201]:
        print(f"✅ Successfully protected {zone_name}")
    else:
        print(f"❌ Failed to add rule to {zone_name}: {response.text}")

def main():
    print("Connecting to Cloudflare...")
    zones_url = "https://api.cloudflare.com/client/v4/zones"
    zones = requests.get(zones_url, headers=headers).json().get("result", [])
    
    if not zones:
        print("No domains found. Check your API key/Email.")
        return

    for zone in zones:
        z_id, z_name = zone["id"], zone["name"]
        print(f"Processing {z_name}...")
        
        rs_id = get_ruleset_id(z_id)
        if not rs_id:
            rs_id = create_ruleset(z_id)
            
        if rs_id:
            add_rule_to_ruleset(z_id, rs_id, z_name)
        else:
            print(f"❌ Could not initialize ruleset for {z_name}")

if __name__ == "__main__":
    main()
