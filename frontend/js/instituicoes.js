console.log("instituicoes.js carregado");

const API_URL = "http://localhost:3000";

async function carregarInstituicoes() {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    try {

        const resposta = await fetch(API_URL + "/instituicoes", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Status:", resposta.status);

        const dados = await resposta.json();

        console.log("Resposta da API:", dados);

        if (!resposta.ok) {
            alert(dados.error);
            return;
        }

        const tabela = document.getElementById("tabelaInstituicoes");
        tabela.innerHTML = "";

        dados.forEach(instituicao => {

            tabela.innerHTML += `
                <tr>
                    <td>${instituicao.id}</td>
                    <td>${instituicao.nome}</td>
                    <td>${instituicao.responsavel}</td>
                    <td>${instituicao.email}</td>
                    <td>${instituicao.cidade}</td>
                    <td>${instituicao.statusOk}</td>
                </tr>
            `;

        });

    } catch (erro) {

        console.error("Erro:", erro);

    }

}

document
    .getElementById("btnAtualizar")
    .addEventListener("click", carregarInstituicoes);

carregarInstituicoes();