// let a = 5;
// let b = 5;

// let ans = a + b;

// console.log(ans);

// var prompt = require('prompt-sync')();

// const age = prompt("Enter your age :- ");

// if (age > 19)
// {
//     console.log("Gonna get 20% Discount");
// }
// else
// {
//     console.log("Gonna get 40% Discount");
// }


///!  --------------------------------------------------------------------------------------



// function add(a,b) {
//     return a+b;
// }

// let add = (a,b)=>{return a+b};

// var result = add(10, 2);

// console.log(result);

///!  --------------------------------------------------------------------------------------

// var fs = require('fs');
// var os = require('os');


// var user = os.userInfo();
// console.log(user);
// console.log(user.username);


// fs.appendFile("greeting.txt", "Hi " + user.username + '!\n',()=>{
//     console.log("Done");
// })

// console.log(os);


///!  --------------------------------------------------------------------------------------



// const notes = require('./notes.js');
// var _ = require('lodash');

// var age = notes.age;
// console.log("Hello");
// console.log(age);

// var addNumber = notes.addNumber(2,5);
// console.log(addNumber);


// var data = ["hi", "bye", 1, 2, 4, 5, 6, "name", "star", "2","2"];

// var filter = _.uniq(data);

// console.log(filter);

// console.log(_.isString(2));


///!  --------------------------------------------------------------------------------------

/*

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString); // Convert JSON string to object
console.log(jsonObject.name); // Output: John




const objectToConvert = { name: "Alice", age: 25 };
const jsonStringified = JSON.stringify(objectToConvert); // Convert object to JSON string
console.log(jsonStringified); // Output: {"name": "Alice", "age":25}

*/

///!  --------------------------------------------------------------------------------------



// const express = require("express");
// const app = express();

// const db = require("./db");

// app.get("/", function (req, res) {
//     res.send("Welcome , we have list of menu items");
// });


// app.listen(3000, () => {
//     console.log("listening on port 3000");
// });


const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});


const personRoutes = require("./routes/personRoutes");
const menuItemsRoutes = require("./routes/menuItemsRoutes");

app.use("/person", personRoutes);
app.use("/menuitem",menuItemsRoutes);




app.listen(3000, () => {
  console.log("Listening on port 3000");
});
