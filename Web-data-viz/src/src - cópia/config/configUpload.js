var multer = require('multer');
var crypto = require('crypto');

// Diretório onde os arquivos serão salvos
// ATENÇÃO: É necessário manter o diretório 'public' para poder utilizar no front-end
var diretorio = 'uploads/';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio);
  },
  filename: (req, file, cb) => {
    var extensaoArquivo = file.originalname.split('.').pop(); 
    var novoNomeArquivo = crypto.randomBytes(64).toString('hex'); 
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
