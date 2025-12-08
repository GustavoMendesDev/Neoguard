    function entrar() {
        var emailVar = iptEmail.value;
        var senhaVar = iptSenha.value;

        if (emailVar == "" || senhaVar == "") {
            mensagem_erro.innerHTML = `<p style="color:#fc0500; font-weight: bold;">Preencha todos os campos</p>`;

            finalizarAguardar();
            return false;
        }
        else {
            setInterval(sumirMensagem, 5000)
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);


        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar,
            }),
        })
            // Mesma coisa q a arrow function =>
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                console.log("ESQUESTTOU NO THEN DO entrar()!")

                if (resposta.ok) {
                    console.log(resposta);
                    console.log('UUUUIAAAA A RESPOSTA ESTÁ OK')

                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        sessionStorage.EMAIL_USUARIO = json.email; // Armazena o json na sessão e utiliza dps quando precisar
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.ID_USUARIO = json.idUsuario;


                        setTimeout(function () {
                            buscarFicha()
                        }, 1000); // apenas para exibir o loading

                    });

                } else {

                    console.log("Houve um erro ao tentar realizar o login!");

                    resposta.text().then(texto => {
                        console.error(texto);
                        finalizarAguardar(texto);
                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })

        return false;
    }

    function sumirMensagem() {
        cardErro.style.display = "none"
    }

  