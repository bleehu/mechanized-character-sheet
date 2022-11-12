(function(){
    $(document).ready(initialize);

function initialize(){
    $("#t1WeaponsPanel").append($("<table id=\"weapontable\"> </table>"));
    addWeaponTableHeader();
    loadWeapons();
    $(".weaponTraitParagraph").hide();
}

function addWeaponTableHeader(){
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
    $("#weapontable").append(tableHeader)
}

function loadWeapons(){
    $.each(tier1json, function(index, weapon){
        var newWeaponRow = $("<tr class=\"weaponRow\"></tr>");
        var id = "" + index;
        newWeaponRow.attr("id", id);
        newWeaponRow.append($("<td>" + weapon["name"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["damage"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["range"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["cost"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["space"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["power"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["ammo"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["tier"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["weight"] + "</td>"));
        newWeaponRow.append($("<td>" + weapon["type"] + "</td>"));
        $("#weapontable").append(newWeaponRow);
        if(weapon["special"] != null){
            loadWeaponTraits(id, weapon["special"]);
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

function loadWeaponTraits(id, special){
    var specialParagraph = $("<p></p>");
    specialParagraph.attr("id", "specialparagraph" + id);
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
    } else {
        
    }
    $("#weapontable").append(specialParagraph);
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
