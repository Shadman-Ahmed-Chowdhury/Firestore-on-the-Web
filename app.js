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
});

const playerName = document.querySelector("#playerName");
const playerClub = document.querySelector("#playerClub");

getRealTimeUpdates = function () {
    const docRef = firestore.collection("players").doc("Marcelo");
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            playerName.innerText = "Player's name: " + myData.Name;
            playerClub.innerText = "Player's Club: " + myData.Club;
        }
    });
};

getRealTimeUpdates();
