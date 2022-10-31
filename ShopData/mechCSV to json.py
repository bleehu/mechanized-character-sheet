import csv, json

def main():
    weaponData = []
    with open("tier1.csv") as csvFile:
        csvData = csv.reader(csvFile)
        tier = "tier 1"
        weight = "light"
        for row in csvData:
            weapon = {}
            weapon["special"] = row[0]
            weapon["name"] = row[1]
            weapon["damage"] = row[2]
            weapon["range"] = row[3]
            weapon["cost"] = row[4]
            weapon["space"] = row[5]
            weapon["power"] = row[6]
            weapon["ammo"] = row[7]
            weapon["type"] = guessTypeByName(weapon["name"])
            weapon["weight"] = weight
            weapon["tier"] = tier
            weaponData.append(weapon)
            if "Chain Cannon" in weapon["name"]:
                weight = "heavy"
            if "H16 Halon Missiles" in weapon["name"]:
                weight = "light"
                tier = "tier 2"
            if "Heavy Rotary Autocannon" in weapon["name"]:
                weight = "heavy"
            
    
    with open("tier1.json", "w") as jsonFile:
        jsonString = f"var tier1json = {json.dumps(weaponData)};"
        jsonFile.write(jsonString)

def guessTypeByName(weaponName):
    if "Missile" in weaponName:
        return "missile"
    if "Plasma" in weaponName or "Laser" in weaponName or "Particle" in weaponName:
        return "energy"
    return "ballistic"

if __name__ == "__main__":
    main()