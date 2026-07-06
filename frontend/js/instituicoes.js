const API_URL = "http://localhost:3000";

async function carregarInstituicoes() {

    const token = localStorage.getItem("token");

    try {

        const resposta = await fetch(API_URL + "/instituicoes", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const dados = await resposta.json();

        console.log(dados);

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

        console.error(erro);

    }

}

document
    .getElementById("btnAtualizar")
    .addEventListener("click", carregarInstituicoes);

carregarInstituicoes();