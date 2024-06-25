const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");




router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu Item Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});



router.get("/:taste", async (req, res) => {
  try
  {
      const taste = req.params.taste;
      const items = await MenuItem.find({ taste: taste });
      if (items.length > 0)
      {
        res.status(200).json(items);
      }
      else
      {
        res.status(404).json({ message: "No items found for this taste" });
      }
  }
  catch (error)
  {
      res.status(500).json({ message: "Internal server error", error });
  }
});


module.exports = router;