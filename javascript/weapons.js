(function(){
    $(document).ready(initialize);

function initialize(){
    $("#t1WeaponsPanel").append($("<table id=\"tier1WeaponTable\"> </table>"));
    $("#t2WeaponsPanel").append($("<table id=\"tier2WeaponTable\"> </table>"));
    $("#t3WeaponsPanel").append($("<table id=\"tier3WeaponTable\"> </table>"));
    $("#specialWeaponsPanel").append($("<table id=\"specializedWeaponTable\"> </table>"));
    $("#meleeWeaponsPanel").append($("<table id=\"meleeWeaponTable\"> </table>"));
    addWeaponTableHeader("tier1WeaponTable");
    addWeaponTableHeader("tier2WeaponTable");
    addWeaponTableHeader("tier3WeaponTable");
    addWeaponTableHeader("specializedWeaponTable");
    addWeaponTableHeader("meleeWeaponTable");
    loadWeapons();
    $(".weaponTraitRow").hide();

    $("#showAllButton").click(showAllWeapons);
    $("#lightOnlyButton").click(showLightWeapons);
    $("#heavyOnlyButton").click(showHeavyWeapons);
    $("#energyOnlyButton").click(showEnergyWeapons);
    $("#plasmaOnlyButton").click(showPlasmaWeapons);
    $("#ballisticOnlyButton").click(showBallisticWeapons);
    $("#missilesOnlyButton").click(showMissileWeapons);
    $("#priceLimitInput").change(showAllWeapons);
}

function addWeaponTableHeader(weaponTableId){
    var tableHeader = $("<thead></thead>");
    tableHeader.append($("<th>Name</th>"));
    tableHeader.append($("<th class=\"damage\">Damage</th>"));
    tableHeader.append($("<th class=\"range\">Range</th>"));
    tableHeader.append($("<th class=\"cost\">Cost</th>"));
    tableHeader.append($("<th class=\"space\">Space</th>"));
    tableHeader.append($("<th class=\"power\">Power</th>"));
    tableHeader.append($("<th class=\"ammo\">Ammo</th>"));
    tableHeader.append($("<th>Tier</th>"));
    tableHeader.append($("<th>Weight</th>"));
    tableHeader.append($("<th>Type</th>"));
    $("#" + weaponTableId).append(tableHeader)
}

function loadWeapons(){
    $.each(tier1json, function(index, weapon){
        var weaponType = weapon["type"];
        var newWeaponRow = $("<tr></tr>");
        newWeaponRow.addClass("weaponRow");
        newWeaponRow.addClass(weaponType+"Row");
        if (weapon["weight"] == "heavy")
            newWeaponRow.addClass("heavyRow");
        else 
            newWeaponRow.addClass("lightRow");
        var id = "" + index;
        newWeaponRow.attr("id", id);
        newWeaponRow.append($("<td class=\"" + weaponType +"\">" + weapon["name"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["damage"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["range"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["cost"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["space"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["power"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["ammo"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["tier"] + "</td>"));
        var weightData = $("<td>" + weapon["weight"] + "</td>");
        if (weapon["weight"] == "heavy")
            weightData.addClass("heavy");
        else 
            weightData.addClass("light");
        newWeaponRow.append(weightData);


        newWeaponRow.append($("<td>" + weapon["type"] + "</td>"));
        var tableName = "#" + weapon["tier"] + "WeaponTable";
        tableName = tableName.replace(" ", '');
        console.log(weapon["name"]  + " added to " + tableName + " .");
        $(tableName).append(newWeaponRow);
        if(weapon["special"] != null && weapon["special"] != ""){
            loadWeaponTraits(id, weapon["special"], tableName);
            newWeaponRow.hover(showSpecialTrait, hideSpecialTrait);
        }
        if(weapon["type"] == "missile"){
            newWeaponRow.addClass("damage")
        }
        else if (weapon["type"] == "ballistic"){
            newWeaponRow.addClass("ammo");
        }
        else if (weapon["type"] == "energy"){
            newWeaponRow.addClass("power");
        }
    });
}

function loadWeaponTraits(id, special, tableName, weaponType){
    var specialRow = $("<tr></tr>");
    specialRow.addClass("weaponTraitRow");
    specialRow.attr("id", "specialparagraph" + id);
    specialRow.addClass(weaponType);
    var specialTableData = $("<td></td>");
    specialTableData.attr("colspan", 10);
    var specialParagraph = $("<p></p>");
    specialParagraph.addClass("weaponTraitParagraph");
    if(special == "(L)"){
        specialParagraph.html("Limited ammo, Can only fire a maximum of one full salvo.");
    } else if (special == "(P)"){
        specialParagraph.html("Pierces normal shields; shields are ineffective (doesn't damage shields).");
    } else if (special == "(+)"){
        specialParagraph.html("Accurate weapon, +1 to accuracy rolls.");
    } else if (special == "(++)"){
        specialParagraph.html("Very accurate weapon, +2 to accuracy rolls.");
    } else if (special == "(±)"){
        specialParagraph.html("Damage bonuses from the Accuracy Roll are 2x as effective.");
    } else if (special == "(±±)"){
        specialParagraph.html("Damage bonuses from the Accuracy Roll are 3x as effective.");
    } else if (special == "(Z)"){
        specialParagraph.html("Can be used once per turn. Fire before all weapons. if a target is marked, you may fire ONE of your weapons, which will automatically hit (at maximum accuracy roll). OR you can choose to acquire a targeting lock, then you may fire any or all of your weapons that use targeting locks. Note, OMEX and ODEMP do not use these abilities to fire..");
    } else if (special == "(S)"){
        specialParagraph.html("Shield draining, 2x damage to shields.");
    } else if (special == "(M)"){
        specialParagraph.html("Can fire with a lock or dumbfire (don't roll regular accuracy). Cost 4 ammo to make 6 missiles. Fires in groups of 6 missiles. Dumbfire damage roll is 1d6, die # is how many of the 6 missiles hit, with a -1 (missile accuracy). If you have a lock, damage roll is the same as dumbfire but with a +3 missile accuracy.  All other to-hit considerations apply. You can choose to roll a d6 for 3 missiles, 1-2, 3-4, 5-6.");
    } else if (special == "(L)"){
        specialParagraph.html("Limited ammo, Can only fire a maximum of one full salvo.");
    } else if (special == "(LT)"){
        specialParagraph.html("Advanced targeting computer, +1 to missile accuracy (not missile lock).");
    } else if (special == "(I)"){
        specialParagraph.html("Heavy Shield Draining, 3x damage to shields.");
    } else if (special == "(F)"){
        specialParagraph.html("Polarized particulates, ignore the target's hex or 1 intervening hex for *ALL* terrain considerations.");
    } else if (special == "(LB)"){
        specialParagraph.html(" +1 missile accuracy except when attacking water terrain; 2 (accumulating) damage over time per missile, lasts for 3 turns (a total of 6 additonal damage per missile hit). 1 missile takes 2 Anti-missile system hits to destroy.");
    } else {
        console.warn("Could not find special trait: " + special);
    }
    specialTableData.append(specialParagraph);
    specialRow.append(specialTableData);
    $(tableName).append(specialRow);

}

function showSpecialTrait(){
    var id = $(this).attr("id");
    console.log("show: " + id);
    $("#specialparagraph"+id).show();
}

function hideSpecialTrait(){
    console.log("hide");
    var id = $(this).attr("id");
    $("#specialparagraph"+id).hide();
}

function showAllWeapons(){
    $(".weaponRow").show();
}

function hideAllWeapons(){
    console.log("hiding weapons.");
    $(".weaponRow").hide();
}

function showLightWeapons(){
    hideAllWeapons();
    $(".lightRow").show();
}

function showHeavyWeapons(){
    console.log("showing heavy weapons.");
    hideAllWeapons();
    $(".heavyRow").show();
}

function showEnergyWeapons(){
    hideAllWeapons();
    $(".energyRow").show();
}

function showPlasmaWeapons(){
    hideAllWeapons();
    $(".plasmaRow").show();
}

function showMissileWeapons(){
    hideAllWeapons();
    $(".missileRow").show();
}

function showBallisticWeapons(){
    hideAllWeapons();
    $(".ballisticRow").show();
}

})();
