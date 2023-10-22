import Consumo_Serv from "../Modelo/consumo_serv.js";
import Usuario from "../Modelo/usuario.js";
import Cliente from "../Modelo/cliente.js";
import Reserva from "../Modelo/reserva.js";
import Hospedagem from "../Modelo/hospedagem.js";
import Itens_Servico from "../Modelo/itensservico.js";
import Servico from "../Modelo/servico.js";

import conectar from "./conexao.js";

export default class Consumo_ServBD {
    async incluir(consumo_serv) {
        if (consumo_serv instanceof Consumo_Serv) {
            const conexao = await conectar();
            const sql = "INSERT INTO consumo_serv(id_hospedagem, data_serv, desconto_serv, valor_serv) VALUES(?,?,?,?)";
            const valores = [consumo_serv.hospedagem.id_hospedagem, consumo_serv.data_serv, consumo_serv.desconto_serv, consumo_serv.valor_serv];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId; 
        }
    }

    async alterar(consumo_serv) {
        if (consumo_serv instanceof Consumo_Serv) {
            const conexao = await conectar();
            const sql = "UPDATE consumo_serv SET id_hospedagem=?, data_serv=?, desconto_serv=?, valor_serv=? WHERE id_consumo_serv=?";
            const valores = [consumo_serv.id_hospedagem, consumo_serv.data_serv, consumo_serv.desconto_serv, consumo_serv.valor_serv, consumo_serv.id_consumo_serv];
            await conexao.query(sql, valores);
        }
    }

    async excluir(consumo_serv) {
        if (consumo_serv instanceof Consumo_Serv) {
            const conexao = await conectar();
            const sql = "DELETE FROM consumo_serv WHERE id_consumo_serv=?";
            const valores = [consumo_serv.id_consumo_serv];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumo_serv INNER JOIN hospedagem ON consumo_serv.id_hospedagem = hospedagem.id_hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id;";
        const [rows] = await conexao.query(sql);
        const listaConsumoServ = [];
        const consumofunc = new Consumo_ServBD();
        for (const row of rows) {
            let listaServicos = await consumofunc.consultaDetalhada(row['id_consumo_serv']);
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo_serv = new Consumo_Serv(row['id_consumo_serv'], row['data_serv'], row['desconto_serv'], row['valor_serv'], listaServicos, hospedagem);
            listaConsumoServ.push(consumo_serv);
        }
        return listaConsumoServ;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumo_serv INNER JOIN hospedagem ON consumo_serv.id_hospedagem = hospedagem.id_hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios on clientes.usuario_id = usuarios.usuario_id WHERE usuarios.nome LIKE ?;";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaConsumoServ = [];
        const consumofunc = new Consumo_ServBD();
        for (const row of rows) {
            let listaServicos = await consumofunc.consultaDetalhada(row['id_consumo_serv']);
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo_serv = new Consumo_Serv(row['id_consumo_serv'], row['data_serv'], row['desconto_serv'], row['valor_serv'], listaServicos, hospedagem)
            listaConsumoServ.push(consumo_serv);
        }
        return listaConsumoServ;
    }

    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumo_serv WHERE id_hospedagem = ?;";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaConsumoServ = [];
        for (const row of rows) {
            const hospedagem = new Hospedagem(row['id_hospedagem']);
            const consumo_serv = new Consumo_Serv(row['id_consumo_serv'], row['data_serv'], row['desconto_serv'], row['valor_serv'], hospedagem)
            listaConsumoServ.push(consumo_serv);
        }
        return listaConsumoServ;
    }

    async consultaDetalhada(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_servicos INNER JOIN servicos ON itens_servicos.id_servico = servicos.id_servico WHERE itens_servicos.id_consumo_serv = ?;";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const lista = [];
        for (const row of rows) {
            const servico = new Servico(row['id_servico'], row['nome_serv'], row['descricao_serv'], row['valor']);
            const itens = new Itens_Servico(row['id_servico'], row['id_consumo_serv'], row['qtd_serv'], row['valor_serv'], servico);
            lista.push(itens);
        }
        return lista;
    }
}