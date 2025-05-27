CREATE DATABASE falconguard; 

CREATE table cadastros(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    codigo INT NOT NULL,
    emailSeguranca VARCHAR(100) NOT NULL
);

INSERT INTO cadastros (nome, email, codigo, emailSeguranca) VALUES ('$nome', '$emailCadastro','$codGerado', '$emailSeguranca')

