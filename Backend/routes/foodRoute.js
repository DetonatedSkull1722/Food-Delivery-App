// routes/foodRoute.js
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { bucket } from "../firebaseConfig.js";

const foodRouter = express.Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  // Generate the same file name as before (Date.now() + original name)
  const filename = `${Date.now()}${req.file.originalname}`;
  const file = bucket.file(filename);

  // Create a write stream to upload the file
  const stream = file.createWriteStream({
    metadata: { contentType: req.file.mimetype },
  });

  stream.on("error", (err) => {
    console.error("Upload Error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  });

  stream.on("finish", async () => {
    // Make the file public so it can be accessed via URL
    await file.makePublic();
    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    // Attach the URL to req.file so that addFood can use it in MongoDB
    req.file.filename = publicUrl; // using the same property name for consistency

    // Call your original controller
    addFood(req, res);
  });

  stream.end(req.file.buffer);
});

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
