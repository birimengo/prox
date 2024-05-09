const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 4000;

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Enable CORS for all origins
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST endpoint for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const imageName = req.body.imageName;
    const description = req.body.description;
    const imagePath = req.file.path;

    // Here, you can save this image path, imageName, and description to a database
    // or perform other operations with this data

    res.status(200).json({ message: 'Image uploaded successfully', imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
