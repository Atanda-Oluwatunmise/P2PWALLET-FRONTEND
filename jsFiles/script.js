const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password");


// code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", ()=>{
        pwFields.forEach(pwField =>{
            if(pwField.type === "password"){
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            }else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

function getFormUser() {
    return {
        userName:document.getElementById("username").value,
        firstName:document.getElementById("firstname").value,
        lastName:document.getElementById("lastname").value,
        email:document.getElementById("email").value,
        phonenumber:document.getElementById("phoneNumber").value,
        address:document.getElementById("address").value,
        password:document.getElementById("password").value
    }
}


function loginUser() {
    return {
        userName:document.getElementById("login-username").value,
        password:document.getElementById("login-password").value
    }
}

function loadDashboard () {
    window.location.replace("http://127.0.1:5500/html/dashboard.html");
}

function clearFormUser() {
    document.getElementById("username").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("address").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
}

function submitForm() {
    let data = getFormUser();

    fetch('https://localhost:7085/api/User/Register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "content-type": "application/json"
            }
        }).then((res)=> res.json()).then(() => {
            clearFormUser();
            loadLogin();
        })
    }

function submitLogin() {
    let data = loginUser();

    fetch('https://localhost:7085/api/User/Login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    }).then((res)=> res.json())
      .then((res) => {
        console.log(res);
        if (res.status == true){
            localStorage.setItem("bearer", res.data.token);
            localStorage.setItem("Username", res.data.name);
            loadDashboard();
        }
        console.log(res.statusMessage);
    })
}


    




