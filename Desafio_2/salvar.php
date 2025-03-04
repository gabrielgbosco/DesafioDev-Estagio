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

// Capturar os dados do formulário
$cep = $_POST['cep'];
$rua = $_POST['rua-avenida'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$estado = $_POST['estado'];

// Formatar a data no formato brasileiro
$data_formatada = date('d/m/Y H:i');

// Inserir no banco de dados
$sql = "INSERT INTO endereco (cep, rua, bairro, cidade, estado, data_hora) VALUES ('$cep', '$rua', '$bairro', '$cidade', '$estado', STR_TO_DATE('$data_formatada', '%d/%m/%Y %H:%i'))";

if ($conn->query($sql) === TRUE) {
    echo "Registro salvo com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

// Fechar conexão
$conn->close();
?>
