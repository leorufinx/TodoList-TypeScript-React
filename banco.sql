START TRANSACTION;

-- ------------------------------------------------------- CRIAR DATABASE
SET
   SQL_MODE = "NO_AUTO_VALUE_ON_ZERO",
   time_zone = "-03:00";

DROP DATABASE IF EXISTS db_todolist;

CREATE DATABASE db_todolist;

USE db_todolist;

-- ------------------------------------------------------- CRIAR TABLES
CREATE TABLE tb_user (
   idUser INT AUTO_INCREMENT PRIMARY KEY,
   Nome VARCHAR(50),
   Senha VARCHAR(60)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE tb_tarefa (
   idTarefa INT AUTO_INCREMENT PRIMARY KEY,
   idUser INT,
   Titulo VARCHAR(30),
   Descricao TEXT,
   Insercao TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE tb_log_tarefa (
   idLog INT AUTO_INCREMENT PRIMARY KEY,
   idUser INT,
   idTarefa INT,
   tipoAlteracao CHAR(6),
   dataHora TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------- CRIAR FOREIGN KEYS
ALTER TABLE
   tb_tarefa
ADD
   CONSTRAINT FK_USER_TAREFA FOREIGN KEY (idUser) REFERENCES tb_user(idUser);

-- ------------------------------------------------------- INSERINDO DADOS
INSERT INTO
   tb_user (Nome)
VALUES
   ('Matheus', 'password'),
   ('Hugo', '123456');

INSERT INTO
   tb_tarefa (idUser, Titulo, Descricao)
VALUES
   (
      1,
      'Louça',
      'Lavar a louça'
   ),
   (
      2,
      'Lixo',
      'Devo tirar o lixo'
   ),
   (
      1,
      'Compras',
      'Lista de compras'
   ),
   (
      2,
      'Estudo',
      'Preparar para exame'
   ),
   (
      1,
      'Exercícios',
      'Treino diário'
   ),
   (
      2,
      'Leitura',
      'Livro recomendado'
   ),
   (
      1,
      'Trabalho',
      'Projeto importante'
   ),
   (
      2,
      'Limpeza',
      'Organizar quarto'
   ),
   (
      1,
      'Cozinha',
      'Experimentar nova receita'
   ),
   (
      2,
      'Expediente',
      'Reunião de equipe'
   ),
   (
      1,
      'Saúde',
      'Consulta médica'
   ),
   (
      2,
      'Finanças',
      'Orçamento mensal'
   );

-- ------------------------------------------------------- PROCEDURES
DELIMITER $ $ CREATE PROCEDURE searchByUser(IN idUser INT) BEGIN
SELECT
   idTarefa,
   Titulo,
   Descricao,
   Insercao
FROM
   tb_tarefa t
   INNER JOIN tb_user u ON u.idUser = t.idUser
WHERE
   u.idUser = idUser
ORDER BY
   Insercao,
   Titulo;

END $ $ DELIMITER;

DELIMITER $ $ CREATE PROCEDURE searchByTitle(IN paramIdUser INT, IN paramTitulo VARCHAR(30)) BEGIN
SELECT
   idTarefa,
   idUser,
   Titulo,
   Descricao,
   Insercao
FROM
   tb_tarefa t
WHERE
   paramIdUser = idUser
   AND Titulo LIKE CONCAT('%', paramTitulo, '%');

END $ $ DELIMITER;

DELIMITER $ $ CREATE PROCEDURE putTarefa(
   IN p_idUser INT,
   IN p_Titulo VARCHAR(30),
   IN p_Descricao TEXT
) BEGIN
INSERT INTO
   tb_tarefa (idUser, Titulo, Descricao)
VALUES
   (p_idUser, p_Titulo, p_Descricao);

END $ $ DELIMITER;

DELIMITER $ $ CREATE PROCEDURE updateTarefa(
   IN p_idTarefa int,
   IN p_Titulo VARCHAR(30),
   IN p_Descricao TEXT
) BEGIN
UPDATE
   tb_tarefa
SET
   Titulo = p_Titulo,
   Descricao = p_Descricao
WHERE
   idTarefa = p_idTarefa;

END $ $ DELIMITER;

DELIMITER $ $ CREATE PROCEDURE deleteTarefa(IN p_idTarefa INT) BEGIN
DELETE FROM
   tb_tarefa
WHERE
   idTarefa = p_idTarefa;

END $ $ DELIMITER;

DELIMITER $ $ CREATE PROCEDURE fazerLogin(
   IN paramNome VARCHAR(50),
   IN paramSenha VARCHAR(60)
) BEGIN
SELECT
   COUNT(
      SELECT
         Nome,
         Senha
      FROM
         tb_user
      WHERE
         paramNome = Nome
         AND paramSenha = Senha
   );

END $ $ DELIMITER;

-- ------------------------------------------------------- TRIGGERS
DELIMITER $ $ CREATE TRIGGER trg_update_tarefa
AFTER
UPDATE
   ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (idUser, idTarefa, tipoAlteracao)
VALUES
   (OLD.idUser, OLD.idTarefa, "UPDATE");

END $ $ DELIMITER $ $ CREATE TRIGGER trg_insert_tarefa
AFTER
INSERT
   ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (idUser, idTarefa, tipoAlteracao)
VALUES
   (NEW.idUser, NEW.idTarefa, "INSERT");

END $ $ DELIMITER $ $ CREATE TRIGGER trg_delete_tarefa
AFTER
   DELETE ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (idUser, idTarefa, tipoAlteracao)
VALUES
   (OLD.idUser, OLD.idTarefa, "DELETE");

END $ $ DELIMITER;

COMMIT;