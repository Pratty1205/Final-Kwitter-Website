var firebaseConfig = {
      apiKey: "AIzaSyBENZJdki8eX77NoCyaM9UP1cGfUAfclpw",
      authDomain: "kwitter-d06ec.firebaseapp.com",
      databaseURL: "https://kwitter-d06ec-default-rtdb.firebaseio.com",
      projectId: "kwitter-d06ec",
      storageBucket: "kwitter-d06ec.appspot.com",
      messagingSenderId: "145077991045",
      appId: "1:145077991045:web:b22a139e55d8665e729bec",
      measurementId: "G-QN5JLKQMY5"
    };
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Welcome " + user_name +"!";
    function addRoom() {
      room_name=document.getElementById("RoomName").value;
      firebase.database().ref("/").child(room_name).update({purpose:"Add Room Name"});
      localStorage.setItem("room_name", room_name);
      window.location="kwitter_page.html";
    }

function getData() {firebase.database().ref("/").on('value',function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name-", Room_names)
       row="<div class='room_name' id="+ Room_names+" onclick='redirectToRoomName(this.id)'>#"+ Room_names+"</div> <hr>"
       document.getElementById("ouput").innerHTML+=row
      });});}
getData();
function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name"+ name);
      window.location="kwitter_page.html";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}