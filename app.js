var firebaseConfig = {
    apiKey: "AIzaSyAN1v_Y0oxGv_HZ7L5JjevXQ_QwIQszilk",
    authDomain: "firestore-on-the-web.firebaseapp.com",
    databaseURL: "https://firestore-on-the-web.firebaseio.com",
    projectId: "firestore-on-the-web",
    storageBucket: "firestore-on-the-web.appspot.com",
    messagingSenderId: "1011323637962",
    appId: "1:1011323637962:web:77a5c1183f1add3f82e433",
    measurementId: "G-ZG48V36XJE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firestore = firebase.firestore();

const favPlayer = document.querySelector("#favPlayer");
const name = document.querySelector("#name");
const clubName = document.querySelector("#clubName");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function () {
    const playerName = name.value;
    const playerClubName = clubName.value;

    console.log(playerName + " plays in " + playerClubName);
    const docRef = firestore.collection("players").doc(playerName);
    docRef
        .set({
            Name: playerName,
            Club: playerClubName,
        })
        .then(function () {
            console.log("Status Saved!");
        })
        .catch(function (error) {
            console.log("Got an error ", error);
        });
    name.value = "";
    clubName.value = "";
});

const playerName = document.querySelector("#playerName");
const playerClub = document.querySelector("#playerClub");

let playerData = [];
const playerList = document.querySelector("#playerList");

function renderPlayerList(doc) {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let clubName = document.createElement("span");

    li.setAttribute("data-id", doc.id);

    name.innerHTML +=
        `<div class="card">
                        <h1>` +
        doc.data().Name +
        ` </h1>
                        </div>`;
    clubName.textContent = doc.data().Club;

    li.appendChild(name);
    li.appendChild(clubName);

    playerList.appendChild(li);
}

firestore
    .collection("players")
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            //console.log(doc.data().Name + " plays in " + doc.data().Club);
            //renderPlayerList(doc);
        });
    });

firestore.collection("players").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
        console.log(change.doc.data());
        if (change.type === "added") {
            renderPlayerList(change.doc);
        }
    });
});
//playerList.innerHTML += "hello " + doc.data().Name + "<br>";
