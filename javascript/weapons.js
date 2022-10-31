(function(){
    $(document).ready(initialize);

function initialize(){
    $("#t1WeaponsPanel").append($("<table id=\"weapontable\"> </table>"));
    addWeaponTableHeader();
    loadWeapons();

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
        if(weapon["special"] == "(L)")
            loadWeaponTraits();

    });
}

function loadWeaponTraits(){
    $("#weapontable").append("<p> Limited ammo, Can only fire a maximum of one full salvo.</p>")
}



})();
