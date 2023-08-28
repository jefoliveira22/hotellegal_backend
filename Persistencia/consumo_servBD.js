import Consumo_Serv from "../Modelo/consumo_serv.js";
import Hospede from "../Modelo/hospede.js";
import Reserva from "../Modelo/reserva.js";
import Hospedagem from "../Modelo/hospedagem.js";

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
        const sql = "SELECT * FROM consumo_serv INNER JOIN hospedagem ON consumo_serv.id_hospedagem = hospedagem.id_hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN hospedes ON reservas.cpf_hosp = hospedes.cpf;";
        const [rows] = await conexao.query(sql);
        const listaConsumoServ = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo_serv = new Consumo_Serv(row['id_consumo_serv'], row['data_serv'], row['desconto_serv'], row['valor_serv'], row['listaServicos'], hospedagem);
            listaConsumoServ.push(consumo_serv);
        }
        return listaConsumoServ;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumo_serv INNER JOIN hospedagem ON consumo_serv.id_hospedagem = hospedagem.id_hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN hospedes ON reservas.cpf_hosp = hospedes.cpf WHERE hospedes.nome LIKE ?;";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaConsumoServ = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo_serv = new Consumo_Serv(row['id_consumo_serv'], row['data_serv'], row['desconto_serv'], row['valor_serv'], row['listaServicos'], hospedagem)
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
}