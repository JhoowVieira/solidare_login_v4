export function aplicarMascaraCPF(campo) {

    campo.addEventListener("input", (e) => {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        e.target.value = valor;

    });

}

export function aplicarMascaraCEP(campo) {

    campo.addEventListener("input", (e) => {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        e.target.value = valor;

    });

}

export function aplicarMascaraTelefone(campo) {

    campo.addEventListener("input", (e) => {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        e.target.value = valor;

    });

}