function fibonacci(n) {
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq.slice(0, n);
}

function executarFibonacci() {
    const resultado = fibonacci(6);
    document.getElementById('resultadoFibonacci').textContent = resultado.join(', ');
}

function buscaBinaria(lista, alvo) {
    let inicio = 0, fim = lista.length - 1;
    while (inicio <= fim) {
        const meio = Math.floor((inicio + fim) / 2);
        if (lista[meio] === alvo) return meio;
        else if (lista[meio] < alvo) inicio = meio + 1;
        else fim = meio - 1;
    }
    return -1;
}

function executarBuscaBinaria() {
    const lista = [5, 12, 18, 23, 45, 70, 89];
    const resultado = buscaBinaria(lista, 23);
    document.getElementById('resultadoBuscaBinaria').textContent = `Índice do número 23: ${resultado}`;
}

function numeroPerfeito(n) {
    let soma = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) soma += i;
    }
    return soma === n;
}

function executarNumeroPerfeito() {
    const resultado = numeroPerfeito(28);
    document.getElementById('resultadoNumeroPerfeito').textContent = resultado ? '28 é um número perfeito.' : '28 não é um número perfeito.';
}

function maiorPalindromo(s) {
    let maior = '';
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substr = s.slice(i, j + 1);
            if (substr === substr.split('').reverse().join('') && substr.length > maior.length) {
                maior = substr;
            }
        }
    }
    return maior;
}

function executarMaiorPalindromo() {
    const resultado = maiorPalindromo('babad');
    document.getElementById('resultadoMaiorPalindromo').textContent = `Maior palíndromo: ${resultado}`;
}

function saqueCaixa(valor) {
    const notas = [100, 50, 20, 10, 5, 2, 1];
    const resultado = [];
    for (let nota of notas) {
        const quantidade = Math.floor(valor / nota);
        if (quantidade > 0) {
            resultado.push(`${quantidade} nota(s) de ${nota}`);
            valor %= nota;
        }
    }
    return resultado;
}

function executarSaqueCaixa() {
    const resultado = saqueCaixa(130);
    document.getElementById('resultadoSaqueCaixa').textContent = resultado.join('\n');
}