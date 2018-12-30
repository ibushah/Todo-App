let add_btn = document.getElementById("add_btn");
let del_all_btn = document.getElementById("del_all_btn");
let sign_up = document.getElementById("sign_up");

let log_out = document.getElementById("log_out");
let log_in = document.getElementById("log_in");

let ul_data = document.getElementById("ul_data");



// page load event

window.addEventListener("load", () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {

            let main = document.getElementById("content");
            main.innerHTML = `<h1 class="jumbotron">Please Login To Continue</h1>`;

            log_out.style.display = "none";
            log_in.style.display = "block";
            sign_up.style.display = "block";



        } else {

            log_out.style.display = "block";
            log_in.style.display = "none";
            sign_up.style.display = "none";
            let profile = document.getElementById("profile");
            console.log(user.uid)
            add_all_task();
            firebase.database().ref(`users/${user.uid}`).once("value", (p) => {
                console.log(p.val())
                profile.innerHTML = `<img src="${p.val().url}" id="img"  alt="" class="img-circle " >
            <div id="h_name" class="h2">${p.val().user_name}</div>`;
            })




        }
    });
})


// add todo list


add_btn.addEventListener("click", () => {
    let task = document.getElementById("task").value;
    if (task != "" && task != " " && task != null) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref(`tasks/${user.uid}`).push(task)
                    .then(() => {
                        document.getElementById("task").value = "";
                        document.getElementById("task").focus();
                        add_all_task();

                    })
            }
        })
    }
    else {
        alert("fill in something")
    }
}

)





// add all tasks

function add_all_task() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref(`tasks/${user.uid}`).once("value", (snap) => {
                let db_Data = snap.val();
                ul_data.innerHTML = "";
                for (var key in db_Data) {
                    ul_data.innerHTML += `<li id="${key}">
                    ${db_Data[key]}
                    <i class="glyphicon glyphicon-remove pull-right i" id="d"></i>
                    <i class="glyphicon glyphicon-edit pull-right i" id="u"></i>
                    <button type="button" onClick="del(this)" class="btn btn-sm btn-danger del_btn pull-right">Delete</button>
                    <button type="button" onClick="update(this)" class="btn btn-sm btn-success del_btn pull-right">Update</button>
    
                  </li>`;


                }
            })
        }
    })

}

// delete a single todo element

function del(e) {
    let id = e.parentNode.id;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(id)
            firebase.database().ref(`tasks/${user.uid}`).child(id).remove();
            add_all_task();

        }
    })

}




// deleting all tasks

del_all_btn.addEventListener("click", () => {

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        firebase.database().ref(`tasks/${user.uid}`).remove();
                        add_all_task();


                    }
                })
                swal("All the tasks have successfully deleted!", {
                    icon: "success",
                });

            } else {
                swal("No tasks deleted!");
            }
        });






})


// updating any single element

function update(e) {
    let id = e.parentNode.id;
    swal("Write something here:", {
        content: "input",
    })
        .then((value) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {

                    firebase.database().ref(`tasks/${user.uid}`).child(id).set(value);
                    add_all_task();
                }
            })
            swal(`Your task has been changed to: ${value}`);
        });

}
// logout button

log_out.addEventListener("click", () => {
    swal({
        title: "Are you sure?",
        text: "Once LoggedOut, you will not be able to see this Data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                firebase.auth().signOut()
                .then(function () {
                    // Sign-out successful.


                    swal("You have successfully logged out!", {
                        icon: "success",
                    }).then(() => {
                        location.assign("./pages/login.html");
                    })
                })
                .catch((error)=>
                {
                    swal(error.message, {
                        icon: "warning",
                    })
                })



            } else {
                swal("Logout cancelled!");
            }
        });

})