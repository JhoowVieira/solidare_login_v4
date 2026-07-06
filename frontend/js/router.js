async function carregarPagina(pagina) {

    const conteudo = document.getElementById("conteudo");

    try {

        const resposta = await fetch("../views/" + pagina);

        const html = await resposta.text();

        conteudo.innerHTML = html;

    } catch (erro) {

        conteudo.innerHTML = `
            <h2>Erro</h2>
            <p>Não foi possível carregar a página.</p>
        `;

        console.error(erro);

    }

}