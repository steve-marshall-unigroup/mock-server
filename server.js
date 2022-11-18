const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 8080;

// default options
app.use(fileUpload());
app.use(cors());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  console.log({
    files: req.files
  });
  uploadPath = __dirname + '/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(port, () => {
    console.log(`Fake Server listening on port ${port}`);
});
