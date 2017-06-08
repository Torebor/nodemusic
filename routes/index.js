var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/playlist');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage : storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp3)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
}).single('txtsubir');

/* GET home page. */
router.get('/', function(req, res, next) {

  var dirPath = './public/playlist';  //directory path
  var fileType = '.mp3'; //file extension
  var files = [];
  fs.readdir(dirPath, function(err,list){
  if(err) throw err;
  for(var i=0; i<list.length; i++)
  {
      if(path.extname(list[i])===fileType)
      {
        console.log(list[i]); //print the file
        files.push(list[i]); //store the file name into the array files
      }
  }
  res.render('index', { list: files });
  });
});

router.post('/index/subir', function(req, res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Solo se admiten formatos mp3");
        }
        return res.redirect('/');
    });
});

module.exports = router;
