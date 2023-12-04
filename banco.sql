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
   id_user  INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(50) UNIQUE,
   hash_password TEXT,
   token_jwt TEXT 
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE tb_tarefa (
   id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
   id_user INT,
   titulo VARCHAR(30),
   descricao TEXT,
   insercao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE tb_log_tarefa (
   id_log INT AUTO_INCREMENT PRIMARY KEY,
   id_user INT,
   id_tarefa INT,
   tipo_alteracao CHAR(6),
   data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------- CRIAR FOREIGN KEYS
ALTER TABLE tb_tarefa
ADD CONSTRAINT FK_USER_TAREFA FOREIGN KEY (id_user) REFERENCES tb_user(id_user);

-- ------------------------------------------------------- PROCEDURES
select hash_password from tb_user;
DELIMITER //

CREATE PROCEDURE get_user_by_name(IN p_username VARCHAR(50))
BEGIN
   SELECT id_user, username, hash_password, token_jwt 
   FROM tb_user
   WHERE username = p_username;
END //

DELIMITER //

CREATE PROCEDURE get_tarefa_by_user_id(IN p_id_user INT)
BEGIN
   SELECT id_tarefa, titulo, descricao, insercao
   FROM tb_tarefa t
   INNER JOIN tb_user u ON u.id_user = t.id_user
   WHERE u.id_user = p_id_user
   ORDER BY insercao, titulo;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE get_tarefa_by_titulo(IN p_titulo VARCHAR(30), IN p_id_user INT)
BEGIN
   SELECT id_tarefa, id_user, titulo, descricao, insercao
   FROM tb_tarefa
   WHERE titulo LIKE CONCAT('%', p_titulo, '%') AND id_user = p_id_user;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE post_user(IN p_username VARCHAR(30), IN p_hash_password TEXT, IN p_token_jwt TEXT)
BEGIN

   INSERT INTO tb_user (username, hash_password, token_jwt)
   VALUES (p_username, p_hash_password, p_token_jwt);
   
END //

DELIMITER //

CREATE PROCEDURE post_tarefa(IN p_id_user INT, IN p_titulo VARCHAR(30), IN p_descricao TEXT)
BEGIN
   INSERT INTO tb_tarefa (id_user, titulo, descricao)
   VALUES (p_id_user, p_titulo, p_descricao);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE put_tarefa(IN p_id_user INT, IN p_id_tarefa INT, IN p_titulo VARCHAR(30), IN p_descricao TEXT)
BEGIN
   UPDATE tb_tarefa
   SET titulo = p_titulo, descricao = p_descricao
   WHERE id_tarefa = p_id_tarefa AND id_user = p_id_user;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE delete_tarefa(IN p_idTarefa INT,IN p_id_user INT)
BEGIN
   DELETE FROM tb_tarefa
   WHERE id_tarefa = p_idTarefa
   and id_user = p_id_user;
END //

DELIMITER ;

-- ------------------------------------------------------- TRIGGERS
DELIMITER $ $ CREATE TRIGGER trg_update_tarefa
AFTER
UPDATE
   ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (id_user, id_tarefa, tipo_alteracao)
VALUES
   (OLD.id_user, OLD.id_tarefa, "UPDATE");

END $ $ DELIMITER $ $ CREATE TRIGGER trg_insert_tarefa
AFTER
INSERT
   ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (id_user, id_tarefa, tipo_alteracao)
VALUES
   (NEW.id_user, NEW.id_tarefa, "INSERT");

END $ $ DELIMITER $ $ CREATE TRIGGER trg_delete_tarefa
AFTER
   DELETE ON tb_tarefa FOR EACH ROW BEGIN
INSERT INTO
   tb_log_tarefa (id_user, id_tarefa, tipo_alteracao)
VALUES
   (OLD.id_user, OLD.id_tarefa, "DELETE");

END $ $ DELIMITER ;

COMMIT;