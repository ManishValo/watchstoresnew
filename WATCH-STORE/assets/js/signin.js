document.addEventListener('DOMContentLoaded',()=>{
const login = document.getElementById('loginform');
login.addEventListener('submit', function (e)
{
    e.preventDefault();
    let emailId=document.getElementById('email').value;
    let password=document.getElementById('Password').value;


    if(!emailId|| !password)
    {
        alert("User details are required !");
        return;
    }

    const data = localStorage.getItem(emailId)
    if(!data)
    {
        alert("User does not exist please sign up!");
        return;
    }

    const storedData = JSON.parse(data);

    if(storedData.password==password)
    {
       alert("Login Successfully");
       sessionStorage.setItem("loggedInUser", JSON.stringify(storedData))
       window.location.href="index.html";
    }
    else{
        alert("Invalid Email and password")
    }  
});

})

document.addEventListener('DOMContentLoaded',()=>{
    let btnlogin = document.getElementById('nav-signin');
    let logout = document.getElementById('nav-signout');
    let user = sessionStorage.getItem('loggedInUser');
    let userId = document.getElementById('userId');
        if(user){
            logout.style="display:block"
        }
        if(user)
        {

            let userDisplay = JSON.parse(user);
            userId.textContent = "Hi, " + userDisplay.name;
            btnlogin.style.display = 'none';
            logout.style.display = 'inline-block';
        }
    logout.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.reload();
    })
})





