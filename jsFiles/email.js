var sendemaildetail = "http://localhost:5127/api/Authentication/forgotpassword";
var sendpinemaildetail = "http://localhost:5127/api/Authentication/forgotpin";

function getemailForm() {
    return {
        email:document.getElementById("emailinfo").value
    }
}

function clearemailForm(){
    document.getElementById("emailinfo").value= "";
}

function sendEmailInfo(){
    $.blockUI();
    var data = getemailForm();
    fetch(sendemaildetail, {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        }
    }).then((res)=> res.json())
    .then((response)=> {
        $.unblockUI();
        console.log(response);
        console.log(response.statusMessage);
        if(response.status == true){
            clearemailForm();
                document.getElementById("emailmsg").innerHTML = response.data; 
        }
        if(response.status != true){
            document.getElementById("emailmsg").innerHTML = response.data; 
        }
    })
}


function sendPinEmailInfo(){
    var data = getemailForm();
    fetch(sendpinemaildetail, {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        }
    }).then((res)=> res.json())
    .then((response)=> {
        console.log(response);
        console.log(response.statusMessage);
        if(response.status == true){
            clearemailForm();
            document.getElementById("pinemailmsg").innerHTML = response.data; 
        }
        if(response.status != true){
            document.getElementById("pinemailmsg").innerHTML = response.data; 
        }
    })
}