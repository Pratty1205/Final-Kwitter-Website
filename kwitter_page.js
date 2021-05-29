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
    room_name=localStorage.getItem("room_name");
    function send() {
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name1=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         name_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'></h4>";
         message_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>" 
         + like +"</button><hr>";
row=name_tag + message_tag + like_button;
document.getElementById("output").innerHTML=row;
      } });  }); }
getData();
function updatelike(message_id) {
      console.log(" Like Button Clicked"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:update_likes
      });
}