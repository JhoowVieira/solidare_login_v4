const API_URL = "http://localhost:3000";

// ===============================
// Verifica se o usuário está logado
// ===============================
async function verificarLogin() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    try {

        const resposta = await fetch(API_URL + "/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!resposta.ok) {

            localStorage.removeItem("token");
            window.location.href = "../index.html";
            return;

        }

        const dados = await resposta.json();

        console.log(dados);

        // Exibe o nome do usuário
        document.getElementById("nomeUsuario").textContent =
            dados.usuario.nome;

    } catch (erro) {

        console.error(erro);

        localStorage.removeItem("token");
        window.location.href = "../index.html";

    }

}

// ===============================
// Logout
// ===============================
function logout() {

    localStorage.removeItem("token");

    window.location.href = "../index.html";

}

document
    .getElementById("logout")
    .addEventListener("click", logout);

verificarLogin();

carregarPagina("home.html");