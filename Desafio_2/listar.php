<?php
// Configuração do banco de dados
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "enderecos";

// Criar conexão
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Definir os valores padrão de ordenação
$campo = isset($_GET['campo']) ? $_GET['campo'] : 'data_hora'; // Ordenação padrão por data
$ordem = isset($_GET['ordem']) ? $_GET['ordem'] : 'DESC'; // Ordem padrão decrescente

// Lista de colunas permitidas para evitar SQL Injection
$colunas_permitidas = ['cidade', 'bairro', 'estado', 'data_hora'];

// Definir ordem válida (ASC ou DESC)
$ordem = strtoupper($ordem) === 'ASC' ? 'ASC' : 'DESC';

// Montar e executar a consulta SQL com ordenação dinâmica
$sql = "SELECT id, cep, rua, bairro, cidade, estado, data_hora FROM endereco ORDER BY $campo $ordem";
$result = $conn->query($sql);

// Criar um array para armazenar os registros
$enderecos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $enderecos[] = $row;
    }
}

// Retornar os dados em formato JSON
echo json_encode($enderecos);

// Fechar conexão
$conn->close();
?>

