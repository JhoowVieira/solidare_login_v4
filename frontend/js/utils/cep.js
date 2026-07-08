export async function buscarCEP(cep) {

    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
        return null;
    }

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const endereco = await resposta.json();

    if (endereco.erro) {
        throw new Error("CEP não encontrado.");
    }

    return endereco;

}