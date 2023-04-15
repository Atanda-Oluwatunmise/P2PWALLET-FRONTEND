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
    var data = getemailForm();
    fetch(sendemaildetail, {
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
            Swal.fire('An email has been sent, go to your mail box to verify')
        }
        if(response.status != true){
            Swal.fire(response.statusMessage);
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
            Swal.fire('An email has been sent, go to your mail box to verify')
        }
        if(response.status != true){
            Swal.fire(response.statusMessage);
        }
    })
}