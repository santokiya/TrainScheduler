  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCcAuQqeRi42JEcc1kV27MeFB-3tZBTBvg",
    authDomain: "train-scheduler-2c01a.firebaseapp.com",
    databaseURL: "https://train-scheduler-2c01a.firebaseio.com",
    projectId: "train-scheduler-2c01a",
    storageBucket: "train-scheduler-2c01a.appspot.com",
    messagingSenderId: "267465259303"
  };
  firebase.initializeApp(config);

// Create a variable to reference database
var database = firebase.database();

//Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var arrival = "";
//Capture Button Click
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();
	// grab values from text boxes
	trainName = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrain = $("#firstTrainTime-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	
console.log(trainName, destination, firstTrain, frequency);
	//Code for push
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		arrival: arrival,
       dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});
// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);

 // Change the HTML to reflect
      $('.table >tbody').append("<tr><td>" + sv.trainName + "</td>" + "<td>" + sv.destination + "</td>" + "<td>" + sv.firstTrain + "</td>" + + "<td>" + " " + "</td>" + "<td>" + sv.frequency + "</td>");
// Moments
var tFrequency = 7;

    // Time is 3:30 AM
    var firstTime = "13:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    });     