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
                    <td>

                        <button
                            class="btnStatus"
                            data-id="${instituicao.id}"
                            data-status="${instituicao.statusOk}"
                        >
                            ${instituicao.statusOk}
                        </button>

                    </td>

                    <td>

                        <button class="btnEditar" data-id="${instituicao.id}">
                            ✏️ Editar
                        </button>

                        <button class="btnExcluir" data-id="${instituicao.id}">
                            🗑️ Excluir
                        </button>

                    </td>
                </tr>
            `;

        });

        document.querySelectorAll(".btnEditar").forEach(botao => {

            botao.addEventListener("click", () => {

                const id = botao.dataset.id;

                console.log("Cliquei em editar:", id);

                editarInstituicao(id);

            });

        });

        document.querySelectorAll(".btnExcluir").forEach(botao => {

            botao.addEventListener("click", async () => {

                const id = botao.dataset.id;

                const confirmar = confirm("Deseja realmente excluir esta instituição?");

                if (!confirmar) {
                    return;
                }

                const token = localStorage.getItem("token");

                try {

                    const resposta = await fetch(API_URL + "/instituicoes/" + id, {

                        method: "DELETE",

                        headers: {
                            Authorization: `Bearer ${token}`
                        }

                    });

                    if (!resposta.ok) {

                        const erro = await resposta.json();

                        alert(erro.error);

                        return;

                    }

                    alert("Instituição excluída com sucesso!");

                    carregarInstituicoes();

                } catch (erro) {

                    console.error(erro);

                    alert("Erro ao excluir a instituição.");

                }

            });

        });

        document.querySelectorAll(".btnStatus").forEach(botao => {

            botao.addEventListener("click", async () => {

                const id = botao.dataset.id;
                const statusAtual = botao.dataset.status;

                const novoStatus = statusAtual === "OK"
                    ? "PENDENTE"
                    : "OK";

                const token = localStorage.getItem("token");

                try {

                    const resposta = await fetch(API_URL + "/instituicoes/" + id + "/status_ok", {

                        method: "PATCH",

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify({
                            statusOk: novoStatus
                        })

                    });

                    const resultado = await resposta.json();

                    if (!resposta.ok) {

                        alert(resultado.error || resultado.erro);

                        return;

                    }

                    alert("Status atualizado com sucesso!");

                    carregarInstituicoes();

                } catch (erro) {

                    console.error(erro);

                    alert("Erro ao atualizar o status.");

                }

            });

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

        let url = API_URL + "/instituicoes";
        let metodo = "POST";

        if (instituicaoEditando !== null) {

            url = API_URL + "/instituicoes/" + instituicaoEditando;
            metodo = "PUT";

        }

        const resposta = await fetch(url, {

            method: metodo,

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        console.log("Método:", metodo);
        console.log("Status:", resposta.status);

        if (!resposta.ok) {

            alert(resultado.error);
            return;

        }

        alert("Instituição salva com sucesso!");

        instituicaoEditando = null;

        fecharModal();

        document.getElementById("formInstituicao").reset();

        carregarInstituicoes();

    } catch (erro) {

        console.error("ERRO COMPLETO:", erro);

        alert("Erro ao cadastrar.");

    }

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

            console.log("Instituição recebida:", instituicao);
    
            instituicaoEditando = id;
    
            document.getElementById("nome").value = instituicao.nome;
            document.getElementById("responsavel").value = instituicao.responsavel;
            document.getElementById("email").value = instituicao.email;
            document.getElementById("telefone").value = instituicao.telefone;
            document.getElementById("endereco").value = instituicao.endereco;
            document.getElementById("cidade").value = instituicao.cidade;
            document.getElementById("tipo").value = instituicao.tipo;
    
            console.log("Abrindo modal...");

            document.getElementById("modalInstituicao").style.display = "block";
    
        } catch (erro) {
    
            console.error(erro);
            alert("Erro ao carregar a instituição.");
    
        }
    
    }

    window.editarInstituicao = editarInstituicao;
