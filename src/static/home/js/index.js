function login(){
	let uname = document.getElementById('username').value;
	let pwd = document.getElementById('password').value;
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
			window.location.replace('/' + uname);
		}
		else if (this.readyState == 4 && this.status == 403){
			let fm = document.getElementById("form");
			var failed = document.createElement("p");
			failed.style.color = "#ff2424";
			failed.innerHTML = "Invalid username/password! Try again";
			fm.append(failed);
		}
		else{
			console.log("error");
			console.log(this.readyState, this.status, this.response);
		}
	};
	xhr.send(JSON.stringify(params));
}
