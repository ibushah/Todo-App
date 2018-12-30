let btn=document.getElementById("btn");
let loader=document.getElementById("load");

btn.addEventListener("click",()=>
{   
    load.style.display="block";

    let email=document.getElementById("email").value;
    let password=document.getElementById("pwd").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>
    {
        load.style.display="none";
        swal("Login Successful!", {
            icon: "success",
        })
        .then(()=>
        {
            location="../index.html";
        });
        
        console.log("daaan")
    }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        load.style.display="none";
       
            swal(error.message, {
                icon: "warning",
            });
      
        // ...
      });
})