window.onload = fillTable;
function fillTable() {
    apiCall("member");
    apiCall("trainer");
    apiCall("wplan");
    apiCall("snp");
    apiCall("dplan");
    apiCall("nutritionist");
    apiCall("adm");
    apiCall("payment");
    apiCall("equipment");
    apiCall("gym");
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
        row.id = "member_"+value["memberid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        var cell7 = row.insertCell();
        var cell8 = row.insertCell();
        var cell9 = row.insertCell();
        var cell10 = row.insertCell();
        cell1.innerHTML = value["memberid"];
        cell1.className = "memberid";
        cell2.innerHTML = value["mname"];
        cell2.className = "mname";
        cell3.innerHTML = value["mphno"];
        cell3.className = "mphno";
        cell4.innerHTML = value["doj"];
        cell4.className = "doj";
        cell5.innerHTML = value["mplan"] + " Months";
        cell5.className = "mplan";
        cell6.innerHTML = value["maddress"];
        cell6.className = "maddress";
        cell7.innerHTML = value["tid"];
        cell7.className = "tid";
        cell8.innerHTML = value["nutrid"];
        cell8.className = "nutrid";
        cell9.innerHTML = value["gid"];
        cell9.className = "gid";
        cell10.innerHTML = "<button class='edit' onclick=getForm('member_"+value["memberid"]+"')>Edit</button>";
    }
}

function ttable(response) {
    var table = document.getElementById("ttable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "trainer_"+value["trainerid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = value["trainerid"];
        cell1.className = "trainerid";
        cell2.innerHTML = value["tname"];
        cell2.className = "tname";
        cell3.innerHTML = value["tphno"];
        cell3.className = "tphno";
        cell4.innerHTML = value["tsalary"];
        cell4.className = "tsalary";
        cell5.innerHTML = "<button class='edit' onclick=getForm('trainer_"+value["trainerid"]+"')>Edit</button>";
    }
}

function wtable(response) {
    var table = document.getElementById("wtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "wplan_"+value["mid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        cell1.innerHTML = value["tid"];
        cell1.className = "tid";
        cell2.innerHTML = value["mid"];
        cell2.className = "mid";
        cell3.innerHTML = value["duration"] + " minutes";
        cell3.className = "duration";
        cell4.innerHTML = value["mgroup"];
        cell4.className = "mgroup";
        cell5.innerHTML = value["wsap"];
        cell5.className = "wsap";
        cell6.innerHTML = "<button class='edit' onclick=getForm('wplan_"+value["mid"]+"')>Edit</button>";
    }
}

function stable(response) {
    var table = document.getElementById("stable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "sap_"+value["sap"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        cell1.innerHTML = value["sap"];
        cell1.className = "sap";
        cell2.innerHTML = value["sts"];
        cell2.className = "sts";
        cell3.innerHTML = value["reps"];
        cell3.className = "reps";
        cell4.innerHTML = "<button class='edit' onclick=getForm('sap_"+value["sap"]+"')>Edit</button>";
    }
}

function dtable(response) {
    var table = document.getElementById("dtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "dplan_"+value["mid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = value["mid"];
        cell1.className = "mid";
        cell2.innerHTML = value["dtype"];
        cell2.className = "dtype";
        cell3.innerHTML = value["calories"];
        cell3.className = "calories";
        cell4.innerHTML = value["nutrid"];
        cell4.className = "nutrid";
        cell5.innerHTML = "<button class='edit' onclick=getForm('dplan_"+value["mid"]+"')>Edit</button>";
    }
}

function ntable(response) {
    var table = document.getElementById("ntable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "nutritionist_"+value["nid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        cell1.innerHTML = value["nid"];
        cell1.className = "nid";
        cell2.innerHTML = value["nname"];
        cell2.className = "nname";
        cell3.innerHTML = value["nincome"];
        cell3.className = "nincome";
        cell4.innerHTML = value["nvd"];
        cell4.className = "nvd";
        cell5.innerHTML = value["gid"];
        cell5.className = "gid";
        cell6.innerHTML = "<button class='edit' onclick=getForm('nutritionist_"+value["nid"]+"')>Edit</button>";
    }
}

function atable(response) {
    var table = document.getElementById("atable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "adm_"+value["aid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        cell1.innerHTML = value["aid"];
        cell1.className = "aid";
        cell2.innerHTML = value["aname"];
        cell2.className = "aname";
        cell3.innerHTML = value["aemail"];
        cell3.className = "aemail";
        cell4.innerHTML = value["aphno"];
        cell4.className = "aphno";
        cell5.innerHTML = value["gid"];
        cell5.className = "gid";
        cell6.innerHTML = "<button class='edit' onclick=getForm('adm_"+value["aid"]+"')>Edit</button>";
    }
}

function ptable(response) {
    var table = document.getElementById("ptable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "payment_"+value["pid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        var cell7 = row.insertCell();
        cell1.innerHTML = value["pid"];
        cell1.className = "pid";
        cell2.innerHTML = value["pmode"];
        cell2.className = "pmode";
        cell3.innerHTML = value["gstno"];
        cell3.className = "gstno";
        cell4.innerHTML = value["mid"];
        cell4.className = "mid";
        cell5.innerHTML = value["amount"];
        cell5.className = "amount";
        cell6.innerHTML = value["admid"];
        cell6.className = "admid";
        cell7.innerHTML = "<button class='edit' onclick=getForm('payment_"+value["pid"]+"')>Edit</button>";
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

function gtable(response) {
    var table = document.getElementById("gtable");
    for (const [key, value] of Object.entries(response)) {
        var row = table.insertRow();
        row.id = "gym_"+value["gymid"];
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = value["gymid"];
        cell1.className = "gymid";
        cell2.innerHTML = value["gname"];
        cell2.className = "gname";
        cell3.innerHTML = value["grating"];
        cell3.className = "grating";
        cell4.innerHTML = value["gloc"];
        cell4.className = "gloc";
        cell5.innerHTML = "<button class='edit' onclick=getForm('gym_"+value["gymid"]+"')>Edit</button>";
    }
}