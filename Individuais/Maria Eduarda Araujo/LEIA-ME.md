# NeoGuard – Explicação dos Bancos

Oi! Aqui é a explicação sobre os dois bancos que usamos na NeoGuard. Eu separei eles por um motivo simples: **um é só para a equipe interna, outro é para controlar os hospitais que contratam a gente**.

---

## 1. Banco NeoGuardSistema

Esse banco é **somente para a equipe NeoGuard**. Nada do hospital entra aqui, eles só visualizam os dados pela nossa dashboard.

O que tem nele:
- **Usuario:** quem pode acessar o sistema (Administrador, Enfermeiro(a), Técnico(a) de enfermagem).  
- **Login:** credenciais de cada usuário.  
- **Incubadora:** incubadoras monitoradas.  
- **Bebe:** informações dos bebês (nome, sexo, peso, data de nascimento).  
- **Sensor:** sensores de temperatura das incubadoras.  
- **HistoricoSensor:** histórico das alterações de temperatura.

**Por que separado:** manter tudo sensível e interno só com a nossa equipe.

---

## 2. Banco NeoGuardEquipe

Esse banco representa os **hospitais clientes**. Aqui a gente guarda:
- **Endereco:** endereço do hospital.  
- **Cliente:** dados do hospital (nome, CNPJ, email).  
- **Telefone:** contatos do hospital.  
- **UsuarioHospital:** equipe do hospital (administrador, coordenador, enfermeiro, técnico).  
- **Incubadora:** incubadoras que o hospital possui.  
- **Sensor e HistoricoSensor:** histórico de leituras dos sensores ligados às incubadoras.  
- **Alerta:** alertas automáticos do sistema.

**Por que separado:** controlar os clientes e seus equipamentos sem misturar com os dados internos dos bebês. Facilita gerar relatórios e alertas.

---

## Por que separei os bancos

1. **Segurança:** o hospital não precisa ver dados internos dos bebês.  
2. **Organização:** um banco é para monitoramento interno, outro é para gestão de clientes.  
3. **Praticidade:** cada banco evolui e é mantido separadamente.

---

## Resumo

- **NeoGuardSistema:** monitoramento interno dos bebês e incubadoras.  
- **NeoGuardEquipe:** gestão de hospitais clientes, usuários e equipamentos.  
- **Separação:** garante segurança, organização e facilidade de manutenção.
