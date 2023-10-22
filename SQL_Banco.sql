CREATE SCHEMA hotellegal;

USE hotellegal;

CREATE TABLE usuarios (
  usuario_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  endereco varchar(50) NOT NULL,
  telefone varchar(20) NOT NULL,
  cidade varchar(30) NOT NULL,
  estado varchar(20) NOT NULL,
  cep varchar(15) NOT NULL,
  tipo_usuario enum('gerente','atendente','auxiliar','hospede','nulo') NOT NULL
);

CREATE TABLE clientes (
  cliente_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id int NOT NULL,
  cpf varchar(20) NOT NULL,
  datanasc date NOT NULL,
  nacionalidade varchar(20) NOT NULL,
  profissao varchar(25) NOT NULL,
  sexo enum('Masculino','Feminino') NOT NULL,
  senha varchar(50) NOT NULL,
  UNIQUE KEY usuario_id (usuario_id),
  UNIQUE KEY cpf (cpf),
  CONSTRAINT clientes_ibfk_1 
	FOREIGN KEY (usuario_id) 
    REFERENCES usuarios (usuario_id) 
    ON DELETE CASCADE
);

CREATE TABLE fornecedores (
  fornecedor_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id int NOT NULL,
  razao_social varchar(100) NOT NULL,
  cnpj varchar(18) NOT NULL,
  ie varchar(20) NOT NULL,
  categoria varchar(25) NOT NULL,
  UNIQUE KEY usuario_id (usuario_id),
  CONSTRAINT fornecedores_ibfk_1 
	FOREIGN KEY (usuario_id) 
    REFERENCES usuarios (usuario_id) 
    ON DELETE CASCADE
);

CREATE TABLE funcionarios (
  funcionario_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id int NOT NULL,
  sexo enum('Masculino','Feminino') NOT NULL,
  datanasc date NOT NULL,
  cargo varchar(50) NOT NULL,
  salario decimal(10,2) NOT NULL,
  nis varchar(20) NOT NULL,
  senha varchar(50) NOT NULL,
  UNIQUE KEY usuario_id (usuario_id),
  UNIQUE KEY nis (nis),
  CONSTRAINT funcionarios_ibfk_1 
	FOREIGN KEY (usuario_id) 
    REFERENCES usuarios (usuario_id) 
    ON DELETE CASCADE
);

CREATE TABLE reservas (
  id_reserva int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cpf_hosp varchar(20) NOT NULL,
  checkin date NOT NULL,
  checkout date NOT NULL,
  qte_pessoa_mais int NOT NULL,
  qte_pessoa_menos int NOT NULL,
  acomodacao varchar(30) NOT NULL,
  canc_free varchar(5) NOT NULL,
  ativo varchar(5) NOT NULL,
  KEY fk_clientes_idx (cpf_hosp),
  CONSTRAINT fk_clientes 
	FOREIGN KEY (cpf_hosp) 
    REFERENCES clientes (cpf)
);

CREATE TABLE hospedagem (
  id_hospedagem int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_reserva int NOT NULL,
  data_ini date NOT NULL,
  data_fim date DEFAULT NULL,
  valor_tot varchar(20) NOT NULL,
  h_ativo varchar(5) NOT NULL,
  CONSTRAINT fk_reserva 
	FOREIGN KEY (id_reserva) 
    REFERENCES reservas (id_reserva)
);

CREATE TABLE consumos (
  id_consumo int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_hospedagem int NOT NULL,
  data_cons date NOT NULL,
  desconto varchar(15) NOT NULL,
  valor varchar(15) NOT NULL,
  CONSTRAINT fk_hospedagem 
	FOREIGN KEY (id_hospedagem) 
    REFERENCES hospedagem (id_hospedagem)
);

CREATE TABLE consumo_serv (
  id_consumo_serv int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_hospedagem int NOT NULL,
  data_serv date NOT NULL,
  desconto_serv varchar(15) NOT NULL,
  valor_serv varchar(15) NOT NULL,
  CONSTRAINT fk_hospedagem_serv 
	FOREIGN KEY (id_hospedagem) 
    REFERENCES hospedagem (id_hospedagem)
);

CREATE TABLE servicos (
  id_servico int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_serv varchar(50) NOT NULL,
  descricao_serv varchar(150) NOT NULL,
  valor varchar(15) NOT NULL
);

CREATE TABLE produtos (
  id_prod int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_prod varchar(100) NOT NULL,
  descricao varchar(200) NOT NULL,
  preco varchar(20) NOT NULL
);

CREATE TABLE itens_servicos (
  id_servico int NOT NULL,
  id_consumo_serv int NOT NULL,
  qtd_serv int NOT NULL,
  valor_serv varchar(15) NOT NULL,
  PRIMARY KEY (id_servico, id_consumo_serv),
	KEY fk_consumo_serv (id_consumo_serv),
  CONSTRAINT fk_consumo_serv 
	FOREIGN KEY (id_consumo_serv) 
    REFERENCES consumo_serv (id_consumo_serv) 
    ON DELETE CASCADE,
  CONSTRAINT fk_servico 
	FOREIGN KEY (id_servico) 
    REFERENCES servicos (id_servico)
);

CREATE TABLE itens_consumo (
  id_prod int NOT NULL,
  id_consumo int NOT NULL,
  qte_prod int NOT NULL,
  valor_prod varchar(15) NOT NULL,
  PRIMARY KEY (id_prod,id_consumo),
	KEY fk_consumo (id_consumo),
  CONSTRAINT fk_consumo 
	FOREIGN KEY (id_consumo) 
    REFERENCES consumos (id_consumo) 
    ON DELETE CASCADE,
  CONSTRAINT fk_produto 
	FOREIGN KEY (id_prod) 
    REFERENCES produtos (id_prod)
);

CREATE TABLE tipos_despesa (
  cod_tipo_desp int NOT NULL PRIMARY KEY,
  descr varchar(50) NOT NULL
);

CREATE TABLE despesas (
  id_despesa int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cod_tipo_despesa int NOT NULL,
  nome_desp varchar(50) NOT NULL,
  nfe int NOT NULL,
  fornecedor varchar(50) NOT NULL,
  data_comp date NOT NULL,
  valortotal varchar(20) NOT NULL,
  obs varchar(255) NOT NULL,
  pago varchar(5) DEFAULT NULL,
  CONSTRAINT cod_tipo_despesa 
	FOREIGN KEY (cod_tipo_despesa) 
    REFERENCES tipos_despesa (cod_tipo_desp)
);

CREATE TABLE quarto (
  idquarto int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  numquarto int NOT NULL,
  nomequarto varchar(45) NOT NULL,
  descricao varchar(100) NOT NULL,
  ocupado varchar(45) NOT NULL
);

CREATE TABLE atividade_camareiro (
  id_atv int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nis_cam varchar(20) NOT NULL,
  descricao varchar(75) NOT NULL,
  prioridade varchar(75) NOT NULL,
  tempoMedioDuracaoMin time NOT NULL,
  KEY fk_funcionarios_idx (nis_cam),
  CONSTRAINT fk_funcionarios 
	FOREIGN KEY (nis_cam) 
    REFERENCES funcionarios (nis)
);

INSERT INTO usuarios(nome,email,endereco,telefone,cidade,estado,cep,tipo_usuario) VALUES("Administrador","adm@hotellegal.com","None","00","None","None","None","gerente");
INSERT INTO funcionarios (usuario_id,sexo,datanasc,cargo,salario,nis,senha) VALUES("1","Masculino","1970-01-01","Gerente","000.00","0000","123");

INSERT INTO quarto (numquarto,nomequarto,descricao,ocupado) VALUES("100","Quarto 1","Quarto com duas camas","N");
INSERT INTO quarto (numquarto,nomequarto,descricao,ocupado) VALUES("200","Quarto 2","Quarto com duas camas","N");
INSERT INTO quarto (numquarto,nomequarto,descricao,ocupado) VALUES("300","Quarto 3","Quarto com uma cama","N");

INSERT INTO produtos (nome_prod,descricao,preco) VALUES("Salgadinho Doritos","Pacote de salgadinho doritos 90g","6.00");
INSERT INTO produtos (nome_prod,descricao,preco) VALUES("Coca Cola 350ml","Lata refrigerante Coca Cola 350ml","5.00");
INSERT INTO produtos (nome_prod,descricao,preco) VALUES("Salgadinho Torcida","Pacote de salgadinho torcida 100g","2.00");
INSERT INTO produtos (nome_prod,descricao,preco) VALUES("Água Mineral","Garrafa de água mineral 500ml","2.50");

INSERT INTO servicos (nome_serv,descricao_serv,valor) VALUES("Limpeza do quarto","Limpeza do quarto completa","30.00");
INSERT INTO servicos (nome_serv,descricao_serv,valor) VALUES("Limpeza do banheiro","Limpeza do banheiro completa","35.00");
INSERT INTO servicos (nome_serv,descricao_serv,valor) VALUES("Troca Roupa de Cama","Troca da roupa de cama","10.00");
INSERT INTO servicos (nome_serv,descricao_serv,valor) VALUES("Serviço de correspondência","Recebimento de armazenamento de correspondências","20.00");

