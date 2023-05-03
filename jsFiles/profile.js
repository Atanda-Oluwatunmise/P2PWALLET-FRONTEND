var accountdetail = "http://localhost:5127/api/User/accountdetails";
var uploadimage = "http://localhost:5127/api/User/uploadimage";
var displayimage = "http://localhost:5127/api/User/displayimage";
var deleteimage = "http://localhost:5127/api/User/deleteimage";
var updateinfo = "http://localhost:5127/api/User/editinfo";
var changepassword = "http://localhost:5127/api/Authentication/changepassword";
var changepin = "http://localhost:5127/api/Authentication/changepin";
var getsecurity = "http://localhost:5127/api/Authentication/getsecuritydetail";


function editPage (show, hideOne, hideTwo, hideThree, hideFour) {    
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    document.getElementById(hideFour).style.display='none';
    return false;
}

function defaultPage(show, hideOne, hideTwo, hideThree, hideFour) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    document.getElementById(hideFour).style.display='none';
    return false;
}

function passwordPage(show, hideOne, hideTwo, hideThree, hideFour) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    document.getElementById(hideFour).style.display='none';
    return false;
}

function pinPage(show, hideOne, hideTwo, hideThree, hideFour) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    document.getElementById(hideFour).style.display='none';
    return false;
}

function profileImagePage(show, hideOne, hideTwo, hideThree, hideFour) {
    document.getElementById(show).style.display="block";
    document.getElementById(hideOne).style.display='none';
    document.getElementById(hideTwo).style.display='none';
    document.getElementById(hideThree).style.display='none';
    document.getElementById(hideFour).style.display='none';
    return false;
}

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}

const addimage = document.querySelector("#imageUploadbtn");
addimage.addEventListener("click", function(){
    const addphoto = document.getElementById("uploadimageInput").files[0];

    const formData = new FormData();
    formData.append("imagePath",addphoto);
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
        if (response.status == true){
            Swal.fire({
                title:"Successful",
                text: response.data,
                icon: "success",
                confirmButtonColor: '#003f88',
                preConfirm: () => {
                    loadprofile();    
                    }
                })
            }  
        })
})


// const imageInput = document.querySelector("#image_input");
// imageInput.addEventListener("change", function(){
//     const photoUpload = document.getElementById("image_input").files[0];

//     const formData = new FormData();
//     formData.append("imagePath", photoUpload)
//     console.log(formData);
//     const bearer = localStorage.getItem("bearer");

//     fetch(uploadimage, {
//         method: "POST",
//         body: formData,
//         headers: {
//             Authorization: `bearer ${bearer}`
//         }
//     }).then((res) => res.json())
//     .then((response) => {
//         console.log(response);
//     })
// })

function displayBase64Image(placeholder, base64Image) {
    var image = document.createElement('img');
    image.onload = function() {
        placeholder.innerHTML = '';
        placeholder.appendChild(this);
    }
    image.src = base64Image;
}

function displayImage(){
    const bearer = localStorage.getItem("bearer");
      fetch(displayimage, {
        headers:{
            "content-type":"application/json",
            Authorization: `bearer ${bearer}`
        }
      }).then((res) => res.json())
      .then((response)=> {
        // console.log(response)
        if(response != null){
            //specify the content type and content endcoding
            var resp = "data:image/png;charset=utf-8;base64," + response.imagePath;
            // console.log(resp);
            var imagePlaceholder = document.getElementById("displayone");
            var imagePlaceholdertwo = document.getElementById("displaytwo");
            var imagePlaceholderthree = document.getElementById("displaythree");
            displayBase64Image(imagePlaceholder, resp);
            displayBase64Image(imagePlaceholdertwo, resp);
            displayBase64Image(imagePlaceholderthree, resp);
            }  
        })
    }
displayImage();

function deleteUploadedImage() {
    document.getElementById("deleteImagebtn").addEventListener("click", function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#003f88',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete Image!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.blockUI();
            const bearer = localStorage.getItem("bearer");
            fetch(deleteimage, {
                method: 'DELETE',
                headers: {
                    Authorization: `bearer ${bearer}`
                }
            }).then((res) => res.json())
            .then((response) => {
                $.unblockUI();
                console.log(response);
                if (response.status == true){
                    Swal.fire({
                        title:"Successful",
                        text: response.data,
                        icon: "success",
                        confirmButtonColor: '#003f88',
                        preConfirm: () => {
                            loadprofile();    
                            }
                        })
                    }
                })
            }
        })
    })
}
deleteUploadedImage();

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

// function getFormInfo() {
//     return {
//         firstName:document.getElementById("editfirstname").value,
//         lastName:document.getElementById("editlastname").value,
//         address:document.getElementById("editaddress").value,
//         phonenumber:document.getElementById("editphonenumber").value
//     }
// }

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

function getSecurityQuestion() {
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
    $.blockUI();

            // const firstName =document.getElementById("editfirstname").value;
            // const lastName = document.getElementById("editlastname").value;
            // const address = document.getElementById("editaddress").value;
            // const phonenumber = document.getElementById("editphonenumber").value;


    // const imageInput = document.querySelector("#image_input");
    const photoUpload = document.getElementById("image_input").files[0];

    const formData = new FormData();
    formData.append("imagePath", photoUpload)
    // formData.append("firstName", firstName)
    // formData.append("lastName", lastName)
    // formData.append("address", address)
    // formData.append("phonenumber", phonenumber)
    console.log(formData);
   

    function getFormInfo() {
        return {
            imageFile: formData,
            firstName:document.getElementById("editfirstname").value,
            lastName:document.getElementById("editlastname").value,
            address:document.getElementById("editaddress").value,
            phonenumber:document.getElementById("editphonenumber").value
        }
    }
    const bearer = localStorage.getItem("bearer");
    var data = getFormInfo();
    fetch(updateinfo, {
        method: 'PUT',
        body: data,
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res)=>res.json()).then((response)=>{
            console.log(response);
            $.unblockUI();
            if(response.status == true){
                clearFormData();
                Swal.fire({
                    title:'Successful!',
                    text:'Details Updated Successfully :)',
                    confirmButtonColor: '#003f88',
                    icon:'success'
                })
            }
            if(response.status != true){
                Swal.fire({
                    title:'Error!',
                    text:'Details cannot be updated :)',
                    confirmButtonColor: '#003f88',
                    icon:'error'
                })
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
    $.blockUI();
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
        $.unblockUI();
        console.log(response);
        if(response.status == true){
            clearPasswordData();
            Swal.fire({
                title:'Successful!',
                text:'Password Changed Successfully :)',
                confirmButtonColor: '#003f88',
                icon:'success'
            })
        }
        
        if(response.status != true){
            Swal.fire({
                title:'Unsuccessful!',
                text:'Password Change failed :(',
                confirmButtonColor: '#003f88',
                icon:'error'
            })
        }
    })
}

function getPinForm() {
    return {
        currentPin:document.getElementById("oldpin").value,
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
    $.blockUI();
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
        $.unblockUI();
        console.log(response);
        if(response.status == true){
            clearPinForm();
            Swal.fire({
                title:'Successful!',
                text:'Pin Changed Successfully :)',
                confirmButtonColor: '#003f88',
                icon:'success'
            })
        }
        if(response.status != true){
            Swal.fire({
                title:'Unsuccessful!',
                text:'Pin Change failed :(',
                confirmButtonColor: '#003f88',
                icon:'error'
            })
        }
    })
}

function loginPage(){
    window.location.replace("http://127.0.0.1:5500/html/addpinemail.html");
}

function loadprofile(){
    window.location.replace("http://127.0.0.1:5500/html/profile.html");
}