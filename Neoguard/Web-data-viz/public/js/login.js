function entrar() {
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;

    // VALIDAÇÃO
    if (emailVar == "" || senhaVar == "") {
        mensagem_erro.innerHTML = `<p style="color:#fc0500; font-weight: bold;">Preencha todos os campos</p>`;
        mensagem_erro.style.display = "block";

        return false;
    }

    console.log("FORM LOGIN:", emailVar, senhaVar);

    // REQUISIÇÃO
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
        .then(resposta => {
            console.log("RESPOSTA:", resposta);

            if (resposta.ok) {
                return resposta.json().then(json => {

                    // ARMAZENANDO NO SESSION STORAGE
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.ID_HOSPITAL = json.idHospital;
                    sessionStorage.NOME_HOSPITAL = json.nomeHospital;
                    sessionStorage.PERMISSAO_USUARIO = json.permissao;

                    console.log("LOGIN EFETUADO COM SUCESSO!");

                    // REDIRECIONAR APÓS LOGIN
                    window.location = "monitoramento.html";
                });
            } else {
                return resposta.text().then(texto => {
                    mensagem_erro.innerHTML = `<p style="color:#fc0500; font-weight:bold;">${texto}</p>`;
                    mensagem_erro.style.display = "block";
                
                });
            }
        })
        .catch(erro => {
            console.error("ERRO NO FETCH:", erro);
            mensagem_erro.innerHTML = `<p style="color:#fc0500; font-weight:bold;">Erro ao conectar com o servidor.</p>`;
            mensagem_erro.style.display = "block";
        });

    return false;
}


