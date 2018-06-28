
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBjVhItGdGFSHcKjhYAP9nbMMjDExOaEfA",
    authDomain: "projectone-bee7b.firebaseapp.com",
    databaseURL: "https://projectone-bee7b.firebaseio.com",
    projectId: "projectone-bee7b",
    storageBucket: "projectone-bee7b.appspot.com",
    messagingSenderId: "223843566957"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
        event.preventDefault();
        

        var trainName = $("#train-name-input").val().trim();
        var trainDes = $("#des-input").val().trim();
        var trainTime = $("#first-train-input").val().trim();
        var trainFreq = $("#freq-input").val().trim();

        if (trainName==null || trainName=="",trainDes==null || trainDes=="",trainTime==null || trainTime=="",trainFreq==null || trainFreq=="")
        {
            alert("Please fill in all required fields! thank you!");
            return false;
        }

    var newTrain = {
        name: trainName,
        des: trainDes,
        time: trainTime,
        freq: trainFreq
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.des);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#des-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().des;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDes);
    console.log(trainTime);
    console.log(trainFreq);
  
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var trainMin = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMin);

    // Next Train
    var trainNext = moment().add(trainMin, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainNext).format("HH:mm"));


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDes + "</td><td>" +
    trainFreq + "</td><td>" + moment(trainNext).format("HH:mm") + " | " + moment(trainNext).format("LT")  + "</td><td>" + trainMin + "</td>");
  });