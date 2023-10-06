function logOut() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

const firebaseConfig = {
    apiKey: "AIzaSyDD0lBD_MxXKlbTpTXw0uvL_MnXlc7G8u4",
    authDomain: "bddtdx.firebaseapp.com",
    databaseURL: "https://bddtdx-default-rtdb.firebaseio.com",
    projectId: "bddtdx",
    storageBucket: "bddtdx.appspot.com",
    messagingSenderId: "485315602416",
    appId: "1:485315602416:web:eef75dd8616d43616bdf35"
};

firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on("value", function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data["name"];
                message = message_data["message"];
                like = message_data["like"];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button =
                    "<button class='btn btn-info' id=" +
                    firebase_message_id +
                    " value=" +
                    like +
                    " onclick='updateLike(this.id)'>";
                span_with_tag =
                    "<i class='bi bi-hand-thumbs-up'>Curtidas: " +
                    like +
                    "</i></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}

getData();
function updateLike(message_id) {
    console.log("clicou no botão curtir - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes,
    });
}
