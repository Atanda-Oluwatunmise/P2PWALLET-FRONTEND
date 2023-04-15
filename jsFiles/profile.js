var accountdetail = "http://localhost:5127/api/User/accountdetails";
var uploadimage = "http://localhost:5127/api/User/uploadimage";
var updateinfo = "http://localhost:5127/api/User/editinfo";
var changepassword = "http://localhost:5127/api/Authentication/changepassword";
var changepin = "http://localhost:5127/api/Authentication/changepin";
var getsecurity = "http://localhost:5127/api/Authentication/getsecuritydetail";


function editPage (show, hideOne, hideTwo, hideThree) {    
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    return false;
}

function defaultPage(show, hideOne, hideTwo, hideThree) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    return false;
}


function passwordPage(show, hideOne, hideTwo, hideThree) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    return false;
}

function pinPage(show, hideOne, hideTwo, hideThree) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    return false;
}

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}

const imageInput = document.querySelector("#image_input");
imageInput.addEventListener("change", function(){
// const uploadBtn = document.getElementById("savebtN");
// uploadBtn.addEventListener("submit", function(e) {
//     e.preventDefault();

    // const inputFile = document.getElementById("savebtN");
    const photoUpload = document.getElementById("image_input").files[0];

    const formData = new FormData();
    formData.append("imagePath", photoUpload)
    console.log(formData);
    const bearer = localStorage.getItem("bearer");

    fetch(uploadimage, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
    .then((response) => {
        console.log(response);
    })

// })
})




// const imageInput = document.querySelector("#image_input");
// var uploaded_Image = "";

// imageInput.addEventListener("change", function(){
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//         uploaded_Image = reader.result;
//         document.querySelectorAll(".profile-main__avatar").forEach(item => {
//             item.style.backgroundImage = `url(${uploaded_Image})`;
//         })
//     });
//     reader.readAsDataURL(this.files[0]);
// })
// var uploaded_Image ="";




function fetchInfo() {
    const bearer = localStorage.getItem("bearer");
    fetch(accountdetail, {
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
      .then((objectdata) => {
        userName ='';
        userEmail = '';
        userPhone = '';
        userAddress = '';
        console.log(objectdata.data)
        objectdata.data.forEach((values) => {
            userName += values.accountName;
            userEmail += values.email;
            userPhone += values.phonenumber;
            userAddress += values.address
        });
        document.getElementById("fullname-info").innerHTML = userName
        document.getElementById("email-info").innerHTML = userEmail;
        document.getElementById("phonenumber-info").innerHTML = userPhone;
        document.getElementById("address-info").innerHTML = userAddress;
    })
}
fetchInfo();

function clearFormData() {
    document.getElementById("editfirstname").value = ""; 
    document.getElementById("editlastname").value = "";
    document.getElementById("editaddress").value = "";
    document.getElementById("editphonenumber").value = "";
}

function getFormInfo() {
    return {
        firstName:document.getElementById("editfirstname").value,
        lastName:document.getElementById("editlastname").value,
        address:document.getElementById("editaddress").value,
        phonenumber:document.getElementById("editphonenumber").value
    }
}

function setFormData(firstName,lastName,address,phonenumber) {
    document.getElementById("editfirstname").value = firstName; 
    document.getElementById("editlastname").value = lastName;
    document.getElementById("editaddress").value = address;
    document.getElementById("editphonenumber").value = phonenumber;
}

function setPasswordFormData(question) {
    document.getElementById("securityquestion").value = question; 
}

function setPinFormData(question) {
    document.getElementById("pinquestion").value = question; 
}


var editFormData;

function editDataCall() {
    const bearer = localStorage.getItem("bearer");

    // call get user details by id API
    fetch(accountdetail,{
        method:"GET",
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=>res.json()).then((response)=>{
        console.log("Edit info",response);
        editFormData =  response.data;
        console.log(editFormData);
        editFormData.forEach((values) => {
            console.log(values.firstName);
        })
        userfirstName ='';
        userlastName = '';
        userPhone = '';
        userAddress = '';
        editFormData.forEach((values) => {
            userfirstName += values.firstName;
            userlastName += values.lastName;
            userPhone += values.phonenumber;
            userAddress += values.address;
        })
	    setFormData(userfirstName,userlastName,userAddress,userPhone)
    })
}


function editDataPasswordCall() {
    const bearer = localStorage.getItem("bearer");

    // call get user details by id API
    fetch(getsecurity,{
        method:"GET",
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=>res.json()).then((response)=>{
        console.log("Edit info",response);

        let respval = Object.values(response.data)
        console.log(respval);
        questionInfo ='';
        var iterator = respval.values();
        for (let elements of iterator) {
            console.log(elements);
            questionInfo += elements;
            setPasswordFormData(questionInfo);
            setPinFormData(questionInfo);

          }
    })
}


// edit Info
function editUser() {
    const bearer = localStorage.getItem("bearer");
    var data = getFormInfo();
    fetch(updateinfo, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=>res.json()).then((response)=>{
            console.log(response);
            if(response.status == true){
                clearFormData();
                Swal.fire('Data Edited Successfully');
            }
    })
}

function submitInfo(){
    editUser();
}

function getPasswordForm() {
    return {
        // question:document.getElementById("securityquestion").value,
        answer:document.getElementById("securityuserName").value,
        currentPassword:document.getElementById("oldpassword").value,
        newPassword:document.getElementById("newpassword").value,
        confirmPassword:document.getElementById("confirmpassword").value
    }
}


function clearPasswordData() {
    document.getElementById("securityquestion").value = ""; 
    document.getElementById("securityuserName").value = ""; 
    document.getElementById("oldpassword").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("confirmpassword").value = "";
}

function changeUserPassword(){
    const bearer = localStorage.getItem("bearer");
    var data = getPasswordForm();
    fetch(changepassword, {
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=> res.json())
    .then((response)=> {
        console.log(response);
        if(response.status == true){
            clearPasswordData();
            Swal.fire('Successful', 'Password Changed Successfully', 'success')
        }
        
        if(response.status != true){
            Swal.fire('Unsuccessful', 'Password Change failed', 'error')
        }
    })
}

function getPinForm() {
    return {
        currentPin:document.getElementById("oldpin").value,
        // question:document.getElementById("pinquestion").value,
        answer:document.getElementById("pinanswer").value,
        newPin:document.getElementById("newpin").value,
        confirmPin:document.getElementById("confirmpin").value
    }
}

function clearPinForm() {
        document.getElementById("oldpin").value= "";
        document.getElementById("pinquestion").value= "";
        document.getElementById("pinanswer").value= "";
        document.getElementById("newpin").value= "";
        document.getElementById("confirmpin").value= "";
}

function changeUserPin(){
    const bearer = localStorage.getItem("bearer");
    var data = getPinForm();
    fetch(changepin, {
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=> res.json())
    .then((response)=> {
        console.log(response);
        if(response.status == true){
            clearPinForm();
            Swal.fire('Pin Changed Successfully')
        }
        if(response.status != true){
            Swal.fire('Pin Change is Unsuccessful')
        }
    })
}

function loginPage(){
    window.location.replace("http://127.0.0.1:5500/html/addpinemail.html");
}