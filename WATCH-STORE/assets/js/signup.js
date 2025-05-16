const signup = document.getElementById('signupform');
signup.addEventListener('submit', function (e)
{
    e.preventDefault();
    let username=document.getElementById('name').value;
    let emailId=document.getElementById('email').value;
    let password=document.getElementById('Password').value;
    let confirmPass=document.getElementById('confirmPassword').value;


    if(!username||!emailId|| !password||!confirmPass)
    {
        alert("User details are required !");
        return;
    }

    if(localStorage.getItem(emailId))
    {
        alert("User is already Exist please login !");
        return;
    }

    if(password==confirmPass)
    {
        const userDetails={
            name:username,
            email:emailId,
            password:password
        }
         localStorage.setItem(emailId,JSON.stringify(userDetails));
          alert("Sign up successfully please login");
          window.location.href="signin.html";
    }
    else{
        alert("Password and confirm password not match")
    }
 
   
    
});