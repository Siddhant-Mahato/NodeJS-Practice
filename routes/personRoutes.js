const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");


router.post("/signup", async (req, res) => {
    try
    {
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data saved");
      
        const payload =
        {
          id: response.id,
          username: response.username,
        };
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token saved", token);
        


        res.status(200).json({response: response, token: token});
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ error: "Error saving error" });
    }
});

router.post("/login", async (req, res) => {

    try
    {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await Person.findOne({ username: username });

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
          return res.status(401).json({ error: "Invalid username or password" });
        }

        // generate Token
        const payload = {
          id: user.id,
          username: user.username,
        };
        const token = generateToken(payload);

        // resturn token as response
        res.json({ token });
        
        
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ error: "Error saving error" });
    }
})



// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving error" });
  }
});


router.get("/:work", async (req, res) => {
    try
    {
        const workType = req.params.work; // Extract the work typefrom the URL parameter
        // Assuming you already have a Person model and MongoDBconnection set up
        if (workType == "chef" || workType == "manager" || workType == "waiter")
        {
            const persons = await Person.find({ work: workType });
            console.log("Response Fetched");
            res.status(200).json(persons);
        }
        else
        {
            res.status(404).json({ error: "Invalid Work Type" });
        }
    }
    catch (error)
    {
        console.error("Error fetching persons:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/:id", async (req, res) => { 
    try
    {
        const id = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(id, data, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        });

        if (!response)
        {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Response Updated");
        res.status(200).json(response);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ error: "Person Not Found" });
    }
})


router.delete("/:id", async (req, res) => {
    try
    {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Data Deleted");
        res.status(200).json({message:"person deleted successfully"});
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ error: "Person Not Found" });
    }
});


module.exports = router;




/*

const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");

// POST endpoint to add a new menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu Item Saved");
    res.status(201).json(response);  // Use 201 for successful resource creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving menu item" });
  }
});

// GET endpoint to fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// GET endpoint to fetch menu items by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    const items = await MenuItem.find({ taste: taste });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "No items found for this taste" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// GET endpoint to fetch lists of items grouped by taste
router.get("/lists/by-taste", async (req, res) => {
  try {
    const tastes = await MenuItem.distinct("taste");
    const tasteLists = await Promise.all(tastes.map(async (taste) => {
      const items = await MenuItem.find({ taste: taste });
      return { taste, items };
    }));

    res.status(200).json(tasteLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;

*/