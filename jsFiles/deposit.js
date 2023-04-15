var makeDepositUrl = "http://localhost:5127/api/Payment/initializepayment";
var verifyPin = "http://localhost:5127/api/Authentication/verifypin";

function loadLogin () {
    window.location.replace("http://127.0.1:5500/html/login.html");
}

function logOut() {   
    localStorage.clear();  
    loadLogin();
}

function loadHomePage () {
    window.location.replace("http://127.0.1:5500/html/dashboard.html");
}

function getDepositAmt(){
    return{
        amount: document.getElementById("amount").value
    }
}

function MakeDeposit(){
    const bearer = localStorage.getItem("bearer");
    document.getElementById("depButton").addEventListener("click", function(){
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#003f88',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Make Deposit!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let data = getDepositAmt();
                            fetch(makeDepositUrl,{
                                method: "POST",
                                body: JSON.stringify(data),
                                headers: {
                                    "content-type": "application/json",
                                    Authorization: `bearer ${bearer}`
                                }
                            }).then((res) => res.json())
                                .then((response) => {
                                    console.log(response);
                                    console.log(response.data.data.authorization_url);
                                    if(response != false){
                                        const iframe = document.createElement("iframe");
                                        iframe.src = response.data.data.authorization_url;               
                                        iframe.style.width ="100%";               
                                        iframe.style.height ="100%";
                                        iframe.style.position = "absolute";
                                        iframe.style.top = "50%";
                                        iframe.style.left = "50%";
                                        iframe.style.overflowY= "hidden";
                                        iframe.style.transform = "translate(-50%, -50%)";
                                        iframe.style.background = "rgba(0, 0, 0, 0.5)";
                                        // iframe.contentDocument.html.style.overflow = "hidden";
                                        document.body.appendChild(iframe);
                                    }
                                })
                            }
                        })
                    })
                }
MakeDeposit();

