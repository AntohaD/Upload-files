let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = '../public/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage
});

router.post('/', upload.array('uploadFile', 10), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host');
  for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/public/' + req.files[i].filename)
  }
  res.send('Files upload');
})

module.exports = router;