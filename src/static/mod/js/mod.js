window.onload = fillTable;
function fillTable() {
    apiCall("member");
    apiCall("trainer");
    apiCall("wplan");
    apiCall("snp");
    apiCall("dplan");
    apiCall("nutritionist");
    apiCall("equipment");
}

function scrollTo(hash) {
    location.hash = "#" + hash;
}

function apiCall(relation) {
    var xhr = new XMLHttpRequest();
    params = {
        "_table": relation
    }
    var url = "http://127.0.0.1:8080/api/gettable";
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application-json');
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
            apiCallback((JSON.parse("[" + this.responseText + "]")[0]), relation)
		}
		else{}
	};
	xhr.send(JSON.stringify(params));
}

function apiCallback(response, relationOld) {
    let relation = relationOld.toLowerCase().replace(relationOld.substr(1), "table");
    eval(relation)(response);
}

function mtable(response) {
    var table = document.getElementById("mtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        var cell7 = row.insertCell();
        var cell8 = row.insertCell();
        var cell9 = row.insertCell();
        cell1.innerHTML = value["memberid"];
        cell2.innerHTML = value["mname"];
        cell3.innerHTML = value["mphno"];
        cell4.innerHTML = value["doj"];
        cell5.innerHTML = value["mplan"] + " Months";
        cell6.innerHTML = value["maddress"];
        cell7.innerHTML = value["tid"];
        cell8.innerHTML = value["nutrid"];
        cell9.innerHTML = value["gid"];
    }
}

function ttable(response) {
    var table = document.getElementById("ttable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        cell1.innerHTML = value["trainerid"];
        cell2.innerHTML = value["tname"];
        cell3.innerHTML = value["tphno"];
        cell4.innerHTML = value["tsalary"];
    }
}

function wtable(response) {
    var table = document.getElementById("wtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = value["tid"];
        cell2.innerHTML = value["mid"];
        cell3.innerHTML = value["duration"] + " minutes";
        cell4.innerHTML = value["mgroup"];
        cell5.innerHTML = value["wsap"];
    }
}

function stable(response) {
    var table = document.getElementById("stable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        cell1.innerHTML = value["sap"];
        cell2.innerHTML = value["sts"];
        cell3.innerHTML = value["reps"];
    }
}

function dtable(response) {
    var table = document.getElementById("dtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        cell1.innerHTML = value["mid"];
        cell2.innerHTML = value["dtype"];
        cell3.innerHTML = value["calories"];
        cell4.innerHTML = value["nutrid"];
    }
}

function ntable(response) {
    var table = document.getElementById("ntable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = value["nid"];
        cell2.innerHTML = value["nname"];
        cell3.innerHTML = value["nincome"];
        cell4.innerHTML = value["nvd"];
        cell5.innerHTML = value["gid"];
    }
}

function etable(response) {
    var table = document.getElementById("etable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        cell1.innerHTML = value["ename"];
        cell2.innerHTML = value["etype"];
        cell3.innerHTML = value["eweightden"];
        cell4.innerHTML = value["gid"];
    }
}
