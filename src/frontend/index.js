function login(){
	let uname = document.getElementById('uname').value;
	let pwd = document.getElementById('pwd').value;
	var xhr = new XMLHttpRequest();
	params = {
		"_uname": uname,
		"_pwd": pwd
	}
	var url = "http://127.0.0.1:8080/api/checklogin";
	xhr.open('POST', url, false);
	xhr.setRequestHeader('Content-type', 'application-json');
	xhr.onreadystatechange = function() {
		if (this.readystate == 4 && this.status == 200){
			console.log(this.response.text);
		}
		else{
			console.log("error");
			console.log(this.readystate, this.status, this.response);
		}
	};
	xhr.send(JSON.stringify(params));
}
