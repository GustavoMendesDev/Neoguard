var userModel = require("../models/UserModel");

function ArtistaTop (req , res){
    var  idUser= req.params.idUser;

    userModel.ArtistaTop(idUser).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })
}function MusicaTop (req , res){
    var  idUser= req.params.idUser;

    userModel.MusicaTop(idUser).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma musica encontrada!")
        }
    })
}
function UserDiario (req , res){
    var idUser= req.params.idUser;

    userModel.UserDiario(idUser).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma diario encontrado!")
        }
    })
}


module.exports = {
    MusicaTop,
   ArtistaTop,
   UserDiario
}