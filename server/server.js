const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { time } = require('console');
const cors = require('cors');
const firebase = require('firebase');
const port = process.env.PORT || 4000
const router = require('./router/');

var userCount = 0;

function getFormatDate(date){
  var year = date.getFullYear();
  var month = (1 + date.getMonth());
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return year + '' + month + '' + day;
}


var now = new Date();
var toDay, sendTime;

toDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
toDay = getFormatDate(toDay);
io.on("connection", (socket) => {
  socket.on('join', function(data){
    socket.join(data);
    socket.name = data;
    userCount++;
    console.log("현재 접속자 수"+userCount);
    socket.broadcast.emit('updateMessage', {currentUser : userCount });
  });
  socket.on("chat message", (data) => {
    var postData = {
      roomId: "testRoom",
      usr: data.usr,
      msg: data.msg,
      time: sendTime
    }
    sendTime = new Date().getHours() + new Date().getMinutes();
    console.log(sendTime);
    firebase.database().ref('chatData/' + toDay + '/testRoom').push(postData);
    // var updates = {};
    // updates['/chatData/' + toDay] = postData;
    // var result = firebase.database().ref().update(updates);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userCount--;
    console.log("현재 접속자 수"+userCount);
    socket.broadcast.emit('updateMessage', {currentUser : userCount });
  });
});

var firebaseConfig = {
  apiKey: "AIzaSyACl3rkQLfAJxpl2hWi9Boh5CKdXEvi41c",
  authDomain: "chattest-a5c27.firebaseapp.com",
  databaseURL: "https://chattest-a5c27.firebaseio.com",
  projectId: "chattest-a5c27",
  storageBucket: "chattest-a5c27.appspot.com",
  messagingSenderId: "63792453852",
  appId: "1:63792453852:web:1b09433704abc7d73bfc19",
  measurementId: "G-ZBZ3TPNB6N"
};

firebase.initializeApp(firebaseConfig);

app.use(cors());
app.use('/',router);
http.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
})