var transfertxn = "http://localhost:5127/api/Transactions/transfers";
var userdetail = "http://localhost:5127/api/User/userdetails";
var accdetail = "http://localhost:5127/api/User/accountdetails";
var verifyPin = "http://localhost:5127/api/Authentication/verifypin";

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}

function getBalance() {
    const bearer = localStorage.getItem("bearer");
    fetch(accdetail, {
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
      .then((objectdata) => {
        balData ='';
        console.log(objectdata.data)
        objectdata.data.forEach((values) => {
            balData += Intl.NumberFormat('en-US').format(values.balance.toFixed(2));
        });
        document.getElementById("txnBalance").innerHTML = balData;
    })
}
getBalance();


function getUserData(){
    var txtval = document.getElementById("account").value
    return{
        accountSearch:txtval
    }
}

function getTransferForm(){
    return {
        accountSearch:document.getElementById("account").value,
        amount:document.getElementById("amount").value
        }
}

function clearFormStudent() {
    document.getElementById("account").value = ""; 
    document.getElementById("accountDetails").innerHTML = "";
    document.getElementById("amount").value = "";
}


function hide() {
    const amnt = document.getElementById("input-amount")
    const txnBtn = document.getElementById("txnButton")
    
    amnt.style.visibility = "hidden";
    txnBtn.style.visibility = "hidden";
}
hide();

function show(){
    const amnt = document.getElementById("input-amount")
    const txnBtn = document.getElementById("txnButton")
    
    amnt.style.visibility = "visible";
    txnBtn.style.visibility = "visible";
}


const inputAccount = document.querySelector("#account");
inputAccount.addEventListener("change", getDetails);

function getDetails(){
    let userdata = getUserData();
    fetch(userdetail,{
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
            "content-type": "application/json"
        }
    }).then((res)=> res.json())
      .then((res) => {
        if(res.status != true){
            userMsg = "Account does not exist!";
            document.getElementById("accountDetails").innerHTML = userMsg;
            hide();
        }
        else{
            let detailsdata = '';
            res.data.forEach((values) => {
                detailsdata += "<p>" + values.accountName + "</p>";
                detailsdata += "<p>" + values.accountNumber + "</p>";
            })
            // console.log(details);
            document.getElementById("accountDetails").innerHTML = detailsdata;
            show();
        }
    })
}

function makeTransfer() {
    const bearer = localStorage.getItem("bearer");
    document.getElementById("txnButton").addEventListener("click", function(){
        Swal.fire({
            title: 'Enter your pin',
            html: `<input type="password" id="pin" class="swal2-input" placeholder="Pin">`,

            focusConfirm: false,
            // showCancelButton: true,
            confirmButtonText: 'Submit',
            confirmButtonColor: '#003f88',
            // showLoaderOnConfirm: true,
            preConfirm: () => {

                    function getPin(){
                        const pindata = Swal.getPopup().querySelector('#pin').value
                        return { userPin: pindata}
                    };
                    var pinData =getPin();

               fetch(verifyPin, {
                method: "POST",
                body: JSON.stringify(pinData),
                headers:{
                    "content-type": "application/json",
                    Authorization: `bearer ${bearer}`
                }
              })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                  if (response.status != true) {
                    Swal.fire({
                        title:'Error!',
                        text:'Pin Not Correct! :)',
                        icon:'error',
                        confirmButtonColor: '#003f88'
                  })                  
                }

                  if (response.status == true) {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#003f88',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Make Transfer!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let data = getTransferForm();
                                fetch(transfertxn, {
                                    method: "PUT",
                                    body: JSON.stringify(data),
                                    headers:{
                                        "content-type": "application/json",
                                        Authorization: `bearer ${bearer}`
                                    }
                                }).then((res) => res.json())
                                  .then((response) => {
                                    console.log(response);
                                        if(response.status == true){
                                            Swal.fire({
                                                title:'Success!',
                                                text:'Your transaction is successful',
                                                confirmButtonColor: '#003f88',
                                                icon:'success',
                                            })
                                        }
                                        if(response.statusMessage === "Amount cannot be less than or equal to 0"){
                                            Swal.fire({
                                                title:'Error!',
                                                text:'Amount cannot be less than or equal to 0 :)',
                                                confirmButtonColor: '#003f88',
                                                icon:'error',
                                            })
                                        }
                                        if(response.statusMessage === "Insufficient Account Balance"){
                                            Swal.fire({
                                                title:'Error!',
                                                text:'Insufficient Balance! :)',
                                                confirmButtonColor: '#003f88',
                                                icon:'error',
                                            })
                                        }
                                        if(response.status != true && response.statusMessage !== "Insufficient Account Balance" && response.statusMessage !== "Amount cannot be less than or equal to 0"){
                                            Swal.fire({
                                                title:'Error!',
                                                text:'Transaction Unsuccessful! :)',
                                                confirmButtonColor: '#003f88',
                                                icon:'error',
                                            })
                                        }
                                        clearFormStudent();
                                        console.log(response);
                                        hide();
                                    })
                                 }
                            })
                        }
                    })
                }     
          })
    })
}

makeTransfer();

