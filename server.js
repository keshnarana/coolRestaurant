// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = 3001;
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var reservation = [
    {
        name: "Person Persons",
        email: "person@person.com",
        phone: "201-555-1212"
    }
];

var returnObj = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/viewTable", function (req, res) {
    res.sendFile(path.join(__dirname, "viewtables.html"));
});

app.get("/makeReservation", function (req, res) {
    res.sendFile(path.join(__dirname, "makereservation.html"));
});

app.get("/api/tables", function (req, res) {
    var returnObj = [];
    if (reservation.length > 5) {
        for (let i = 0; i < 5; i++) {
            returnObj.push(reservation[i]);
        }
        return res.json(returnObj);
    } else {
        for (let i = 0; i < reservation.length; i++) {
            returnObj.push(reservation[i]);
        }
        return res.json(returnObj);
    }
})

app.get("/api/waitlist", function (req, res) {
    var returnObj = [];
    if (reservation.length < 6) {
        return res.json(returnObj);
    } else {
        for (let i = 0; i < (reservation.length - 5); i++) {
            returnObj.push(reservation[i+5]);
        }
        return res.json(returnObj);
    }
})

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

    // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    
    console.log(newReservation);
    
    reservation.push(newReservation);
    
    //  ** don't need to return the new reservation because the page will show that if they ask for it
    if(reservation.length > 5) {
        res.json(false);
    } else {
        res.json(true);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// Displays all tables objects
// app.get("/api/showreserveration", function(req, res) {
//   return res.json(reservations);
// });

// Displays all waitlist objects
// app.get("/api/showwaitlist", function(req, res) {
//     if(reservation.length > 5) {
//         for (var i = 5; i < (reservation.length - 5); i++) {
//           return res.json(reservations);
// });

// Code from original StarWars app that logs entered character name to the console and returns a 'character' object
// Displays a single character, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });
