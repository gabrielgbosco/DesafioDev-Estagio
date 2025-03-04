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

// Verificar se foi enviado um ID válido
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Converte para inteiro (evita SQL Injection)

    $sql = "DELETE FROM endereco WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Registro excluído com sucesso!";
    } else {
        echo "Erro ao excluir o registro.";
    }

    $stmt->close();
} else {
    echo "ID inválido!";
}

// Fechar conexão
$conn->close();
?>
