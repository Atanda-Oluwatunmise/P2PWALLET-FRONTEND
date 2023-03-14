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
    console.log(bearer);
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
            balData += values.balance;
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
        accountNumber:document.getElementById("account").value,
        amount:document.getElementById("amount").value
        }
}


function clearFormStudent() {
    document.getElementById("account").value = ""; 
    document.getElementById("amount").value = "";
}

// document.querySelector(".paybtn").addEventListener('click', function(){
//     Swal.fire("Our First Alert", "With some body text!");
//   });

function makeTransfer(){
    let data = getTransferForm();
    const bearer = localStorage.getItem("bearer");
    if (confirm("Confirm Transaction") == true){
 
    fetch("https://localhost:7085/api/Transactions/Transfers", {
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                "content-type": "application/json",
                Authorization: `bearer ${bearer}`
            }
    }).then((res) => res.json)
      .then((response) => {
        clearFormStudent();
        console.log(response);
      })  
}
}

// makeTransfer();

function DebitTransactionHistory() {
    const bearer = localStorage.getItem("bearer");
    fetch("https://localhost:7085/api/Transactions/DebitTransactionsHistory", {
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
            tabledata += "<td>" + values.dateofTransaction + "</td>";
            tabledata += "</tr>"
        });          
        document.getElementById("table-body").innerHTML = tabledata;
    })
}
DebitTransactionHistory();

function CreditTransactionHistory() {
    const bearer = localStorage.getItem("bearer");
    fetch("https://localhost:7085/api/Transactions/CreditTransactionsHistory", {
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
            tabledata += "<td>" + values.dateofTransaction + "</td>";
            tabledata += "</tr>"
        });          
        document.getElementById("ctable-body").innerHTML = tabledata;
    })
}
CreditTransactionHistory();