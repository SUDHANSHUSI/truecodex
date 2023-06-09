// this middleware is for image upload and accessing data of form-data

const multer = require("multer");
const path = require("path");

const directory = path.join(__dirname, "..", "BlogImages");

const uploadPhoto = (req, res, next) => {
  // this variable is to specify where image must be stored
  // and with what name image must be stored
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `blogs-${req.body.title}-${Date.now()}.${ext}`);
    },
  });

  // this variable is to check whether user uploads image only
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(console.log("Not an image"));
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  }).single("image");

  upload(req, res, (err) => {
    if (err) {
      console.log("err", err);
    }
    next();
  });
};

module.exports = uploadPhoto;
