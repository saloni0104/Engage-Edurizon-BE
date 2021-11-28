const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

exports.destroyer = (id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(id, (err, result) => {
      if (!err) {
        resolve({
          message: "File deleted successfully",
          result,
        });
      }
    });
  });
};