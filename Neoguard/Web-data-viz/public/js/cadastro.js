function VerificarEmail() {
    var email = iptEmail.value;
    var validacao = "@";

    if (email == '' || email.includes(validacao)) {
        console.log(`validação ok!`)
    } else {
        alert(`O E-mail necessita ter '@' ! `)
    }

}


function VerificarSenha() {

    var i = 0;
    var senha = iptSenha.value;


    var criterio1 = 0
    var criterio2 = 0
    var criterio3 = 0
    var criterio4 = 0

    var maiusculo = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
    var minusculo = 'abcdefghijklmnpqrstuvwxyz'
    var especiais = '!@#$%*()[]ªº¹²³£¢¬<>,.;:/?°-=+_§|'
    var numeros = '123456789'


    var caracter = '';


    var email = iptEmail.value;



    console.log(email, senha)


    if (senha.length < 8) {
        senhaForte.innerHTML = '<p style="color:#fc0500; font-weight: bold;">Senha deve conter ao menos 8 caracteres</p>'

    } else {
        while (i < senha.length) {
            caracter = senha[i];


            if (maiusculo.includes(caracter)) {
                criterio1 = 1;

            } else if (minusculo.includes(caracter)) {
                criterio2 = 1;
            } else if (especiais.includes(caracter)) {
                criterio3 = 1;
            } else if (numeros.includes(caracter)) {
                criterio4 = 1;
            }



            i++;

        }
        var criterios = criterio1 + criterio2 + criterio3 + criterio4

        if (criterios == 4) {
            senhaForte.innerHTML = '<p style="color:#006400; font-weight: bold; ">Senha muito Forte</p>'
        } else if (criterios == 3) {

            senhaForte.innerHTML = '<p style="color:#70F000; font-weight: bold;">Senha forte</p>'
        } else if (criterios == 2) {
            senhaForte.innerHTML = '<p style="color:#cFF000; font-weight: bold;">Senha fraca</p>'

        } else {
            senhaForte.innerHTML = '<p style="color:#fc0500; font-weight: bold;">Senha fraca</p>'


        }
    }


}
let idHospital = 0;




function cadastrarHospital() {


    var cnpjVar = iptCnpj.value;
    var nomeHospitalVar = iptHospital.value;

    if (cnpjVar == '' || nomeHospitalVar == '') {

        console.log('preencha todos os campos ')
    } else {
        document.getElementById('formCadastroHospital').style.display = 'none';


        fetch('/hospitais/cadastrar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeHospitalServer: nomeHospitalVar,
                cnpjServer: cnpjVar

            }),
        }).then(resposta => resposta.json())
            .then(hospital => {
                console.log(idHospital)

                console.log('Hospital cadastrado com sucesso', hospital)
            })


            .catch(err => {
                console.log('Cadastro não realizado', err)
            })

    }

    function cadastrarSala(idHospital) {
        var numSala = iptNumSala.value;
    }







}

function cadastrarGestor() {


    var nomeVar = iptNome.value;
    var sobrenomeVar = iptSobrenome.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;


    if (nomeVar == '' ||
        emailVar == '' ||
        sobrenomeVar == '' ||
        senhaVar == ''
    ) {
        document.getElementById('msgErro').style.display = 'flex';

    } else {



    }
}