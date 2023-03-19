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
            balData += Intl.NumberFormat('en-US').format(values.balance.toFixed(2));
            accData += values.accountNumber;
        });
        document.getElementById("outputName").innerHTML = loggeduserName
        document.getElementById("accountBal").innerHTML = balData;
        document.getElementById("accNumber").innerHTML = accData;
    })
}
fetchBalance();

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
            tabledata += `<tr class="${values.transType === 'CREDIT' ? 'green-text' : 'red-text'}">`;
            tabledata += "<td>" + values.senderInfo + "</td>";
            tabledata += "<td>" + values.currency + Intl.NumberFormat('en-US').format(values.txnAmount.toFixed(2)) + "</td>";
            tabledata += "<td>" + values.transType +"</td>";
            tabledata += "<td>" + values.receiverInfo +"</td>";
            tabledata += "<td>" + new Date(values.dateofTransaction).toLocaleString() + "</td>";
            tabledata += `</tr>`;

        });          
        document.getElementById("table-body").innerHTML = tabledata;
        $(document).ready(function(){
            $('#table-head').DataTable();
            
        });
        
    })
}
TransactionHistory();