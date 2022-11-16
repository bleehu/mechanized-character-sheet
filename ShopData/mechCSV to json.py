from ast import arg
import csv, json, argparse

argumentParser = argparse.ArgumentParser(
    prog="MechCSVtoJSON",
    description="This applet takes in a csv file that contains data about " +
    "weapons for Mechanized, the game, and turns it into .json data " +
    "that the rules sheet can read and display."
)
argumentParser.add_argument('filename', help="the filename of the csv file containing weapon data.")


def main(filename):
    weaponData = []
    with open(filename) as csvFile:
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
            if "C20 Concussion Missiles" in weapon["name"]:
                weight = "light"
                tier = "tier 3"
            if "Heavy Polaron Cannon" in weapon["name"]:
                weight = "heavy"
            if "Firestorm" in weapon["name"]:
                weight = "light"
                tier = "specialized"
            if "C3 Concussion Missiles" in weapon["name"]:
                weight = "light"
                tier = "melee"

            
    
    with open("tier1.json", "w") as jsonFile:
        jsonString = f"var tier1json = {json.dumps(weaponData)};"
        jsonFile.write(jsonString)

def guessTypeByName(weaponName):
    if "Missile" in weaponName:
        return "missile"
    if "Plasma" in weaponName:
        return "Plasma"        
    if "Laser" in weaponName or "Particle" in weaponName or "Polaron" in weaponName or "Ion" in weaponName:
        return "energy"
    if "fist" in weaponName or "saw" in weaponName or "sword" in weaponName or "flamethrower" in weaponName:
        return "melee"        
    return "ballistic"

if __name__ == "__main__":
    commandLineArguments = argumentParser.parse_args()
    filename = commandLineArguments.filename
    main(filename)