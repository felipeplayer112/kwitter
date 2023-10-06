
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

document.getElementById("user_name").innerHTML = "bem vindo(a), " + user_name;
function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "sala adicionada"
    })
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on("value", function (snapshoot) {
        document.getElementById("output").innerHTML = "";
        snapshoot.forEach(function (childSnapshoot) {
            chidlKey = childSnapshoot.key;
            Room_names = chidlKey;
            console.log("nome da sala : " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logOut() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}