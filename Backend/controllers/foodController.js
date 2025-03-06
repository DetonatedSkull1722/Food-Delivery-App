// controllers/foodController.js
import foodModel from "../models/foodModel.js";
// Remove fs as you no longer delete local files

const addFood = async (req, res) => {
  // req.file.filename now holds the Firebase URL
  let image_url = req.file.filename;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_url,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    // Remove image from Firebase Storage
    // Extract file name from the URL (the part after the last '/')
    const filename = food.image.split("/").pop();
    console.log(filename);
    const { bucket } = await import("../firebaseConfig.js"); // lazy import if needed

    await bucket.file(filename).delete();

    // Remove the food record from MongoDB
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    res.json({ success: false, message: `Failed! ${error.message}` });
  }
};

export { listFood, addFood, removeFood };
