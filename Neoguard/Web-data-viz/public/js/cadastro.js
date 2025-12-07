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
    let cnpjVar = ''
    let nomeHospitalVar = ''

    cnpjVar = iptCnpj.value;
    nomeHospitalVar = iptHospital.value;

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
                idHospital = hospital.insertId;
                console.log('Id do hospital', idHospital)

                console.log('Hospital cadastrado com sucesso', hospital)

                document.getElementById('cadastrarSalaNeonatal').innerHTML = `
                
            <div class="contentCriarSala">
                <h3 style="margin-top: 25px; color:#333; font-weight:600;">
                    Cadastro das Salas Neonatais
                </h3>
                <p style="font-size: 14px; color:#555; margin-bottom: 10px;">
                    Adicione até 5 salas neonatais do hospital recém cadastrado.
                </p>

                <form id="formCadastroSala" >
                    <div class="input-group">
                        <label for="numeroSala">Número da Sala</label>
                        <input type="text" id="iptNumSala" placeholder="Ex: 01, 02..." required>
                    </div>

                    <button type="button" class="btn-cadastro" onclick="cadastrarSala(${idHospital})">
                        Adicionar Sala
                    </button>
                    <button type="button" class="btn-cadastro" onclick="telaGestor()">
                        Cadastrar Gestor
                    </button>
                </form>

                <div id="msgCadSala"></div>

             
            </div>
                `;
            })


            .catch(err => {
                console.log('Cadastro não realizado', err)
            })

    }
}

function cadastrarSala(idHospital) {
    document.getElementById('linha').style.background = '#A88CFF';

    var numSalaVar = iptNumSala.value;


    if (numSalaVar == '') {

        console.log('preencha todos os campos ')
    } else {
        document.getElementById('formCadastroHospital').style.display = 'none';


        fetch('/salasNeoNatais/cadastrar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idHospitalServer: idHospital,
                numSalaServer: numSalaVar

            }),
        }).then(resposta => resposta.json())
            .then(salas => {
                console.log('AAAAAAA', salas)
                document.getElementById('msgCadSala').innerHTML += `
            <p>SALA CADASTRADA COM SUCESSO</p>
            `;



                console.log('Sala cadastrada com sucesso', sala)
            })


            .catch(err => {
                console.log('Cadastro não realizado', err)
            })



    }



}

function telaGestor() {
    document.getElementById('etapa2').style.background = '#A88CFF';

    document.getElementById('linha2').style.background = '#A88CFF';

    document.getElementById('cadastrarSalaNeonatal').innerHTML = ``;
    document.getElementById('formCadastroGestor').style.display = 'block';

    document.getElementById('formCadastroGestor').innerHTML = `
        <div class="input-group">
            <label>Nome</label>
            <input type="text" id="iptNome" placeholder="Digite seu nome" required>
        </div>

        <div class="input-group">
            <label>Sobrenome</label>
            <input type="text" id="iptSobrenome" placeholder="Digite seu sobrenome" required>
        </div>

        <div class="input-group">
            <label>E-mail</label>
            <input type="email" id="iptEmail" placeholder="Digite seu e-mail" required>
        </div>

        <div class="input-group">
            <label>Senha</label>
            <input type="password" id="iptSenha" oninput="VerificarSenha()" placeholder="Digite sua senha"
                required>
            <div id="senhaForteGestor"></div>
            <p class="avisoSenha">
                A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.
            </p>
            <div id="senhaForte"></div>
        </div>

        <button type="button" onclick="cadastrarGestor(${idHospital})" class="btn-cadastro">
            Cadastrar Gestor
        </button>

        <p class="cadastro">Já tem login? <a href="/app/views/Login.html">Entre aqui</a></p>
    `;
}



function cadastrarGestor(idHospital) {

console.log(idHospital)
    var nomeVar = iptNome.value;
    var sobrenomeVar = iptSobrenome.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;


console.log('Nome' , nomeVar  , 'Sobrenome ',sobrenomeVar )

    if (nomeVar == '' ||
        emailVar == '' ||
        sobrenomeVar == '' ||
        senhaVar == ''
    ) {
        document.getElementById('msgErro').style.display = 'flex';

    } else {



        fetch('/usuarios/cadastrar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                sobrenomeServer: sobrenomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                tipoServer: 1,
                hospitalServer: idHospital

            }),
        }).then(resposta => resposta.json())
            .then(gestor => {
                console.log('aaaaa', gestor)


                console.log('gestor cadastrado com sucesso', gestor)
            })


            .catch(err => {
                console.log('Cadastro não realizado', err)
            })



    }
}