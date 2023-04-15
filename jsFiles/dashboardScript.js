var accountdetail = "http://localhost:5127/api/User/accountdetails";
var transactionhistory = "http://localhost:5127/api/Transactions/transactionshistory";
var verifyUser = "http://localhost:5127/api/Authentication/validateuser";
var createPin = "http://localhost:5127/api/Authentication/createpin";
var addsecurity = "http://localhost:5127/api/Authentication/addsecuritydetail";

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}


$(document).ready(function(){
    //jquery for toggle sub menus
    $('.sub-btn').click(function(){
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
    });
});


function pinNotification(){
    const bearer = localStorage.getItem("bearer");
    fetch(verifyUser,{
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    })
        .then((res)=> res.json())
        .then((response)=> {
            console.log(response);

            if (response.data ==="Never created a Pin"){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: true,
                    confirmButtonText: 'Okay!',
                    confirmButtonColor: "#003f88",
                    // timer: 10000,
                    // timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Create your pin'
                  }).then((result) => {
                    if(result.isConfirmed){
                        Swal.fire({
                            title: 'Enter your pin',
                            html: `
                            <input type="password" id="pin" class="swal2-input" placeholder="Pin" width="100px">
                            <input type="password" id="confirmpin" class="swal2-input" placeholder="Confirm Pin">
                            <select type="text" id="security-question" class="swal2-input">
                                <option value="">Select a security question</option>
                                <option>What city were you born in?</option>
                                <option>What is your oldest sibling middle name?</option>
                                <option>In what city or town did your parents meet?</option>
                                <option>What is the make and model of your first car?</option>
                                <option>What was the first concert you attended?</option>
                            </select>
                            <input type="" id="security-answer" class="swal2-input" placeholder="Enter your security answer">`,
                            focusConfirm: false,
                            // showCancelButton: true,
                            inputAttributes:{
                                width: '100px' 
                            },
                            confirmButtonText: 'Submit',
                            confirmButtonColor: "#003f88", 
                            width: '600px',                          
                            
                            preConfirm: () => {

                                function getPin(){
                                    const pindata = Swal.getPopup().querySelector('#pin').value
                                    const confirmPin = Swal.getPopup().querySelector('#confirmpin').value

                                    if (pindata != confirmPin){
                                        Swal.fire({
                                            text: 'Pin does not match',
                                            confirmButtonColor: "#003f88"                       
                                    })
                                    }
                                    // if ((pinData.Length || confirmPin.Length) < 4){
                                    //     Swal.fire('Pin Length must be Four digits')

                                    // }
                                    return { userPin: pindata}
                                };

                                function getSecurityData(){
                                    const questiondata = Swal.getPopup().querySelector('#security-question').value
                                    const anwswerdata = Swal.getPopup().querySelector('#security-answer').value

                                    return {
                                        question:questiondata,
                                        answer:anwswerdata
                                    }
                                }
                                
                                var pinData = getPin();
                                var securityData = getSecurityData();
                              fetch(createPin, {
                                method: "POST",
                                body:  JSON.stringify(pinData),
                                headers: {
                                    "content-type": "application/json",
                                    Authorization: `bearer ${bearer}`
                                }
                                }).then((res) => res.json())
                                .then((response) => {
                                    console.log(response);
                                    if (response.status != true){
                                        Swal.fire('Pin Creation Unsuccessful')
                                    }

                                    if (response.status == true){
                                        fetch(addsecurity, {
                                            method: "POST",
                                            body:  JSON.stringify(securityData),
                                            headers: {
                                                "content-type": "application/json",
                                                Authorization: `bearer ${bearer}`
                                            }
                                        }).then((res) => res.json())
                                        .then((response) => {
                                            console.log(response);
                                            if (response.status == true){
                                                Swal.fire({
                                                    text:'Pin Created Successfully',
                                                    confirmButtonColor: "#003f88"                        
                                            })
                                        }

                                        })
                                    }

                                })
                                }
                              })  
                            }
                        })
                    }
                })
            }

pinNotification();



function fetchBalance() {
    const bearer = localStorage.getItem("bearer");
    const loggeduserName = localStorage.getItem("Username");
    fetch(accountdetail, {
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
    fetch(transactionhistory, {
        headers: {
            "content-type": "application/json",
            Authorization: `bearer ${bearer}`
        }
    }).then((res) => res.json())
      .then((objectdata)=>{
        let tabledata = '';
        console.log(objectdata.data)
        objectdata.data.forEach((values) => {
            // tabledata += `<tr class="${values.transType === 'CREDIT' ? 'green-text' : 'red-text'}">`;
            tabledata += "<tr>";
            tabledata += "<td>" + values.senderInfo + "</td>";
            tabledata += "<td>" + values.currency + Intl.NumberFormat('en-US').format(values.txnAmount.toFixed(2)) + "</td>";
            tabledata += `<td class="${values.transType === 'CREDIT' ? 'green-text' : 'red-text'}">` + values.transType +`</td>`;
            tabledata += "<td>" + values.receiverInfo +"</td>";
            tabledata += "<td>" + new Date(values.dateofTransaction).toLocaleString() + "</td>";
            tabledata += "</tr>";

        });          
        document.getElementById("table-body").innerHTML = tabledata;
        $(document).ready(function(){
            $('#table-head').DataTable();
            
        });
        
    })
}
TransactionHistory();