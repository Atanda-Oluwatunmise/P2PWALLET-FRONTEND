

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}

function fetchBalance() {
    const bearer = localStorage.getItem("bearer");
    const loggeduserName = localStorage.getItem("Username");
    fetch("https://localhost:7085/api/User/AccountDetails", {
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
      .then((objectdata) => {
        balData ='';
        accData = '';
        console.log(objectdata.data)
        objectdata.data.forEach((values) => {
            balData += values.balance.toFixed(2);
            accData += values.accountNumber;
        });
        document.getElementById("outputName").innerHTML = loggeduserName
        document.getElementById("accountBal").innerHTML = balData;
        document.getElementById("accNumber").innerHTML = accData;
    })
}
fetchBalance();

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



function TransactionHistory() {
    const bearer = localStorage.getItem("bearer");
    fetch("https://localhost:7085/api/Transactions/TransactionsHistory", {
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
      .then((objectdata)=>{
        let tabledata = '';
        console.log(objectdata.data)
        objectdata.data.forEach((values) => {
            tabledata += "<tr>"
            tabledata += "<td>" + values.name + "</td>";
            tabledata += "<td>" + values.accountNumber + "</td>";
            tabledata += "<td>" + values.currency + "</td>";
            tabledata += "<td>" + values.amount + "</td>";
            tabledata += "<td>" + values.transType + "</td>";
            tabledata += "<td>" + new Date(values.dateofTransaction).toLocaleDateString() + "</td>";
            tabledata += "</tr>"
        });          
        document.getElementById("table-body").innerHTML = tabledata;
        $(document).ready(function(){
            $('#table-head').DataTable();
        });
    })
}
TransactionHistory();


function getUserData(){
    
        var txtval = document.getElementById("account").value
        return{
            accountSearch:txtval
        }

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


function getDetails(){
    let userdata = getUserData();
    fetch("https://localhost:7085/api/User/UserDetails",{
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
    document.getElementById("txnButton").addEventListener("click", function(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Transfer!'
          }).then((result) => {
            if (result.isConfirmed) {
                let data = getTransferForm();
                const bearer = localStorage.getItem("bearer");
        
                    fetch("https://localhost:7085/api/Transactions/Transfers", {
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers:{
                            "content-type": "application/json",
                            Authorization: `bearer ${bearer}`
                        }
                    }).then((res) => res.json())
                      .then((response) => {
                            if(response.status == true){
                                Swal.fire(
                                    'Success!',
                                    'Your transaction is successful',
                                    'success'
                                )
                            }
                            if(response.status != true){
                                Swal.fire(
                                    'Error!',
                                    'Transaction Unsuccessful! :)',
                                    'error'
                                )
                            }
                            clearFormStudent();
                            console.log(response);
                        })
                     }
                })
            })
        }
makeTransfer();