let btn = document.getElementById("btn");
let load=document.getElementById("load");


// submit btn



btn.addEventListener("click", () => {
    load.style.display="block";
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let address = document.getElementById("address").value;
    let user_name = document.getElementById("user_name").value;
    let file = document.getElementById("file").files[0];
    img_name=file.name;


    
    let data =
    {
        user_name,
        email,
        password,
        address,
        url: "http://myafricanunion.org/sites/all/themes/illusion/images/no-avatar.jpg",
        img_name


    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((prof) => {

          
            // firebase.auth().onAuthStateChanged(function (user) {
            //     if (user)
            //      {
            //         // User is signed in.
            //         uid = user.uid;

            //         console.log(uid)

            //     }});

            let store = firebase.storage().ref(`profile/${file.name}`);
            store.put(file).
                then((url) => {
                    url.ref.getDownloadURL()
                    .then((urlRef) => {
                            data.url = urlRef;
                            firebase.database().ref(`users/${prof.user.uid}`).set(data)
                                .then(() => {
                                    load.style.display="none";
                                   
                                    swal("profile Signed Up!", {
                                        icon: "success",
                                    })
                                    .then(()=>
                                    {
                                        location="../pages/login.html";
                                    });
                                    
                                })

                        })
                })





        })
        .catch((error)=>
        {
            load.style.display="block";
            swal(error.message, {
                icon: "warning",
            });
        })

})