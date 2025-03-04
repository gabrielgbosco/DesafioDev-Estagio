let cepValido = false; // Variável para armazenar o estado do CEP

const limparFormulario = () => {
    document.getElementById('rua-avenida').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    cepValido = false; // Define como inválido ao limpar o formulário
};

const preencherFormulario = (endereco) => {
    document.getElementById('rua-avenida').value = endereco.logradouro || '';
    document.getElementById('bairro').value = endereco.bairro || '';
    document.getElementById('cidade').value = endereco.localidade || '';
    document.getElementById('estado').value = endereco.estado || '';
    cepValido = true; // Define como válido se houver dados
};

const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length === 8) {
        try {
            const resposta = await fetch(url);
            const endereco = await resposta.json();

            if (endereco.erro) {
                alert("CEP não encontrado! Verifique e tente novamente.");
                cepValido = false;
            } else {
                preencherFormulario(endereco);
            }
        } catch (erro) {
            console.error("Erro ao buscar CEP:", erro);
            alert("Erro ao buscar CEP. Tente novamente.");
            cepValido = false;
        }
    } else {
        alert("CEP inválido! Insira um CEP correto.");
        cepValido = false;
    }
};

// Impedir envio do formulário se o CEP for inválido
document.querySelector("form").addEventListener("submit", (event) => {
    if (!cepValido) {
        event.preventDefault(); // Impede o envio do formulário
        alert("Por favor, insira um CEP válido antes de salvar.");
    }
});

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

let ordemAtual = {
    cidade: "ASC",
    bairro: "ASC",
    estado: "ASC"
};

const carregarRegistros = async (campo = "data_hora", ordem = "DESC") => {
    try {
        const resposta = await fetch(`listar.php?campo=${campo}&ordem=${ordem}`);
        const enderecos = await resposta.json();

        const tabela = document.querySelector(".lista-de-registros table tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de carregar os dados

        enderecos.forEach((endereco) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${endereco.cep}</td>
                <td>${endereco.rua}</td>
                <td>${endereco.bairro}</td>
                <td>${endereco.cidade}</td>
                <td>${endereco.estado}</td>
                <td>${endereco.data_hora}</td>
                <td class="td-excluir"><button class="interacoes-tabela" onclick="excluirRegistro(${endereco.id})">Excluir</button></td>
            `;
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao carregar registros:", erro);
    }
};

// Função para alternar a ordenação
const ordenarPor = (campo) => {
    ordemAtual[campo] = ordemAtual[campo] === "ASC" ? "DESC" : "ASC"; // Alterna ASC/DESC
    carregarRegistros(campo, ordemAtual[campo]); // Carrega os registros ordenados
};

// Função para excluir um registro
const excluirRegistro = async (id) => {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        try {
            const resposta = await fetch(`excluir.php?id=${id}`, { method: "GET" });
            const resultado = await resposta.text();

            alert(resultado);
            carregarRegistros(); // Atualiza a tabela após a exclusão
        } catch (erro) {
            console.error("Erro ao excluir registro:", erro);
        }
    }
};

// Carregar os registros ao carregar a página
document.addEventListener("DOMContentLoaded", () => carregarRegistros());