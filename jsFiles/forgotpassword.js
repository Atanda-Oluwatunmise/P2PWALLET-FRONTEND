var reseturl = "http://localhost:5127/api/Authentication/resetpassword";
var resetpinurl = "http://localhost:5127/api/Authentication/resetpin";

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


const queryParams = new URLSearchParams(window.location.search);
function getToken(){
    for (const value of queryParams.values()) {
        return value;
    }   
}
var usertoken = getToken();

function getFormInfo() {
    return {
        password:document.getElementById("resetpassword").value,
        confirmPassword:document.getElementById("resetconfirmpassword").value,
        token:usertoken
    }
}

function clearForm(){
    document.getElementById("resetpassword").value ="";
    document.getElementById("resetconfirmpassword").value ="";
}

function resetPassword(){
    data = getFormInfo();
    fetch(reseturl,{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            "content-type": "application/json"
        }
    }).then((res)=> res.json())
    .then((response) =>{
        console.log(response);
        if(response.status != true){
            document.getElementById("msg").innerHTML = "Password Reset unsuccessful ):"; 
        }
        if(response.status == true){
        clearForm();
        document.getElementById("msg").innerHTML = `Password Reset Successful (: <a href="/html/login.html">Log in</a>`; 
        }
    })
}

function getFormPin() {
    return {
        pin:document.getElementById("resetpin").value,
        confirmPin:document.getElementById("resetconfirmpin").value,
        token:usertoken
    }
}

function clearpinForm(){
    document.getElementById("resetpin").value ="";
    document.getElementById("resetpin").value ="";
}


function resetPin(){
    data = getFormPin();
    fetch(resetpinurl,{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            "content-type": "application/json"
        }
    }).then((res)=> res.json())
    .then((response) =>{
        console.log(response);
        if(response.status != true){
            document.getElementById("msg").innerHTML = "Pin Reset unsuccessful ):"; 
        }
        if(response.status == true) {
        clearpinForm();
        document.getElementById("msg").innerHTML = `Pin Reset Successful (: <a href="/html/login.html">Log in</a>`; 
        }
    })
}
