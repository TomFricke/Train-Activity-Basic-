var config = {
    apiKey: "AIzaSyB7EZD-F2PC1s3m0Rwwg1eY8wI7WZrE_QM",
    authDomain: "tomfricketrains.firebaseapp.com",
    databaseURL: "https://tomfricketrains.firebaseio.com",
    projectId: "tomfricketrains",
    storageBucket: "tomfricketrains.appspot.com",
    messagingSenderId: "903989540680"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainCompany = "";
var destination = "";
var nextArrival = "";
var frequency = 0;

function currentTime() {
  var current = moment().format('LT');
  $("#currentTime").html(current);
  setTimeout(currentTime, 1000);
};
$(".form-field").on("keyup", function() {
    var traintemp = $("#train-name").val().trim();
    var citytemp = $("#destination").val().trim();
    var timetemp = $("#first-train").val().trim();
    var freqtemp = $("#frequency").val().trim();
  
    sessionStorage.setItem("train", traintemp);
    sessionStorage.setItem("city", citytemp);
    sessionStorage.setItem("time", timetemp);
    sessionStorage.setItem("freq", freqtemp);
  });
  
  $("#train-company").val(sessionStorage.getItem("train"));
  $("#destination").val(sessionStorage.getItem("city"));
  $("#next-arrival").val(sessionStorage.getItem("time"));
  $("#frequency").val(sessionStorage.getItem("freq"));
  
  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    if ($("#train-company").val().trim() === "" ||
      $("#destination").val().trim() === "" ||
      $("#next-arrival").val().trim() === "" ||
      $("#frequency").val().trim() === "") {
  
      alert("Please fill in all details to add new train");
  
    } else {
  
      trainCompany = $("#train-company").val().trim();
      destination = $("#destination").val().trim();
      nextArrival = $("#next-arrival").val().trim();
      frequency = $("#frequency").val().trim();
  
      $(".form-field").val("");
  
      database.ref().push({
        trainCompany: trainCompany,
        destination: destination,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  
      sessionStorage.clear();
    }
  
  });