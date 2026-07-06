console.log("instituicoes.js VERSÃO NOVA");

const API_URL = "http://localhost:3000";

let instituicaoEditando = null;

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

                    <td>

                        <button onclick="editarInstituicao(${instituicao.id})">
                            ✏️ Editar
                        </button>

                    </td>
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

// Abrir o modal
document
    .getElementById("btnNovaInstituicao")
    .addEventListener("click", () => {

        document.getElementById("modalInstituicao").style.display = "block";

    });

// Fechar o modal
document
    .getElementById("btnFecharModal")
    .addEventListener("click", () => {

        document.getElementById("modalInstituicao").style.display = "none";

    });

    carregarInstituicoes();

    // Função para fechar o modal
    function fecharModal() {
    
        document.getElementById("modalInstituicao").style.display = "none";
    
    }
    
    document
        .getElementById("formInstituicao")
        .addEventListener("submit", cadastrarInstituicao);
    
    async function cadastrarInstituicao(e) {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const dados = {

        nome: document.getElementById("nome").value,
        responsavel: document.getElementById("responsavel").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        tipo: document.getElementById("tipo").value

    };

    try {

        const resposta = await fetch(API_URL + "/instituicoes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        if (!resposta.ok) {

            alert(resultado.error);
            return;

        }

        alert("Instituição cadastrada com sucesso!");

        fecharModal();

        document.getElementById("formInstituicao").reset();

    } catch (erro) {

        console.error("ERRO COMPLETO:");
        console.error(erro);
        console.error(erro.message);
        console.error(erro.stack);
    
        alert("Erro ao cadastrar.");
    
    }

    //Função editarInstituicao
    async function editarInstituicao(id) {

        const token = localStorage.getItem("token");
    
        try {
    
            const resposta = await fetch(API_URL + "/instituicoes/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            const instituicao = await resposta.json();
    
            instituicaoEditando = id;
    
            document.getElementById("nome").value = instituicao.nome;
            document.getElementById("responsavel").value = instituicao.responsavel;
            document.getElementById("email").value = instituicao.email;
            document.getElementById("telefone").value = instituicao.telefone;
            document.getElementById("endereco").value = instituicao.endereco;
            document.getElementById("cidade").value = instituicao.cidade;
            document.getElementById("tipo").value = instituicao.tipo;
    
            document.getElementById("modalInstituicao").style.display = "block";
    
        } catch (erro) {
    
            console.error(erro);
            alert("Erro ao carregar a instituição.");
    
        }
    
    }

}