const multer = require("multer");

// file upload middleware
const storage = multer.diskStorage({
    destination: "./public/movies/",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

module.exports = upload;