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


function getFormPin() {
    return {
        pin:document.getElementById("resetpin").value,
        confirmPin:document.getElementById("resetconfirmpin").value,
        token:usertoken
    }
}

function clearpinForm(){
    document.getElementById("resetpin").value ="";
    document.getElementById("resetconfirmpin").value ="";
}


function resetPin(){
    $.blockUI();
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
        $.unblockUI();
        if(response.status != true){
            document.getElementById("pinemailmsg").style.color = "red".innerHTML = "Pin Reset unsuccessful ):"; 
        }
        if(response.status == true) {
        clearpinForm();
        document.getElementById("pinemailmsg").innerHTML = `Pin Reset Successful (: <a href="/html/login.html">Log in</a>`; 
        }
    })
}
