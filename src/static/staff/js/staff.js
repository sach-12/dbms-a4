window.onload = fillTable;
function fillTable() {
    apiCall("member");
    apiCall("trainer");
    apiCall("nutritionist");
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
