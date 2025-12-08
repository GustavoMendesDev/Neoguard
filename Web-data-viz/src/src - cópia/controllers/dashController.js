var dashModel = require("../models/dashModels");

function Artistatotal (req , res){
   
    dashModel.Artistatotal()
    .then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })

}function Musicatotal (req , res){
    dashModel.Musicatotal()
    .then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma musica encontrada!")
        }
    })
}
function MusicaNumero (req , res){
    dashModel.MusicaNumero()
    .then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma musica encontrada!")
        }
    })
}


module.exports = {
    Musicatotal,
   Artistatotal,
   MusicaNumero
}