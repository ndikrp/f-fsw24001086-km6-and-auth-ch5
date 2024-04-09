require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Edit where picture will be saved in cloudinary (folder)
const config = {
    dir: "bcr_management-dashboard"
}

module.exports = { cloudinary, config };
