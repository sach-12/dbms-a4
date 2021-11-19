function login(){
	let uname = document.getElementById('uname').value;
	let pwd = document.getElementById('pwd').value;
	var xhr = new XMLHttpRequest();
	params = {
		"_uname": uname,
		"_pwd": pwd
	}
	var url = "http://127.0.0.1:8080/api/checklogin";
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application-json');
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			console.log(this.response.text);
			window.location.replace('/admin');
		}
		else{
			console.log("error");
			console.log(this.readyState, this.status, this.response);
		}
	};
	xhr.send(JSON.stringify(params));
}
