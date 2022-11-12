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
        var newWeaponRow = $("<tr class=\"weaponRow\"></tr>");
        var id = "" + index;
        var weaponType = weapon["type"];
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
        newWeaponRow.append();


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
    } else if (special == "(±)"){
        specialParagraph.html("Damage bonuses from the Accuracy Roll are 2x as effective.");
    } else if (special == "(±±)"){
        specialParagraph.html("Damage bonuses from the Accuracy Roll are 3x as effective.");
    } else if (special == "(Z)"){
        specialParagraph.html("Can be used once per turn. Fire before all weapons. if a target is marked, you may fire ONE of your weapons, which will automatically hit (at maximum accuracy roll). OR you can choose to acquire a targeting lock, then you may fire any or all of your weapons that use targeting locks. Note, OMEX and ODEMP do not use these abilities to fire..");
    } else if (special == "(S)"){
        specialParagraph.html("Shield draining, 2x damage to shields.");
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

})();
