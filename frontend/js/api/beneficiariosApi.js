const API_URL = "http://localhost:3000";

function obterHeaders() {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

}

// ===========================================
// LISTAR
// ===========================================

export async function listarBeneficiarios() {

    const resposta = await fetch(`${API_URL}/beneficiarios`, {
        headers: obterHeaders()
    });

    return resposta;

}

// ===========================================
// BUSCAR POR ID
// ===========================================

export async function buscarBeneficiario(id) {

    const resposta = await fetch(`${API_URL}/beneficiarios/${id}`, {
        headers: obterHeaders()
    });

    return resposta;

}

// ===========================================
// CADASTRAR
// ===========================================

export async function cadastrarBeneficiarioAPI(dados) {

    const resposta = await fetch(`${API_URL}/beneficiarios`, {

        method: "POST",

        headers: obterHeaders(),

        body: JSON.stringify(dados)

    });

    return resposta;

}

// ===========================================
// EDITAR
// ===========================================

export async function editarBeneficiarioAPI(id, dados) {

    const resposta = await fetch(`${API_URL}/beneficiarios/${id}`, {

        method: "PUT",

        headers: obterHeaders(),

        body: JSON.stringify(dados)

    });

    return resposta;

}

// ===========================================
// EXCLUIR
// ===========================================

export async function excluirBeneficiarioAPI(id) {

    const resposta = await fetch(`${API_URL}/beneficiarios/${id}`, {

        method: "DELETE",

        headers: obterHeaders()

    });

    return resposta;

}

// ===========================================
// STATUS
// ===========================================

export async function alterarStatusBeneficiarioAPI(id, ativo) {

    const resposta = await fetch(`${API_URL}/beneficiarios/${id}`, {

        method: "PATCH",

        headers: obterHeaders(),

        body: JSON.stringify({
            ativo
        })

    });

    return resposta;

}