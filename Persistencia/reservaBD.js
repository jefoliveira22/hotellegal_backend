import Reserva from "../Modelo/reserva.js";
import conectar from "./conexao.js";
import Hospede from "../Modelo/hospede.js";

export default class ReservaBD {
    async incluir(reserva) {
        if (reserva instanceof Reserva) {
            const conexao = await conectar();
            const sql = "INSERT INTO reservas(cpf_hosp, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo) VALUES(?,?,?,?,?,?,?,?)";
            const valores = [reserva.hospede.cpf, reserva.checkin, reserva.checkout, reserva.qte_pessoa_mais, reserva.qte_pessoa_menos, reserva.acomodacao, reserva.canc_free, reserva.ativo];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(reserva) {
        if (reserva instanceof Reserva) {
            const conexao = await conectar();
            const sql = "UPDATE reservas SET cpf_hosp=?, checkin=?, checkout=?, qte_pessoa_mais=?, qte_pessoa_menos=?, acomodacao=?, canc_free=?, ativo=? where id_reserva=?";
            const valores = [reserva.hospede.cpf, reserva.checkin, reserva.checkout, reserva.qte_pessoa_mais, reserva.qte_pessoa_menos, reserva.acomodacao, reserva.canc_free, reserva.ativo, reserva.id_reserva];
            await conexao.query(sql, valores);
        }
    }

    async baixaReserva(reserva) {
        if (reserva instanceof Reserva) {
            const conexao = await conectar();
            const sql = "UPDATE reservas SET ativo = '?' WHERE (id_reserva = ?);";
            const valores = [reserva.ativo, reserva.id_reserva];
            await conexao.query(sql, valores);
        }
    }

    async excluir(reserva) {
        if (reserva instanceof Reserva) {
            const conexao = await conectar();
            const sql = "DELETE FROM reservas WHERE id_reserva=?";
            const valores = [reserva.id_reserva];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM reservas INNER JOIN hospedes ON reservas.cpf_hosp = hospedes.cpf";
        const [rows] = await conexao.query(sql);
        const listaReservas = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }

    async consultarUltimoID() {
        const conexao = await conectar();
        const sql = "SELECT * FROM reservas INNER JOIN hospedes ON reservas.cpf_hosp = hospedes.cpf WHERE id_reserva ORDER BY id_reserva DESC limit 1";
        const [rows] = await conexao.query(sql);
        const listaReservas = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }
    
    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT id_reserva, cpf_hosp, DATE_FORMAT(checkin, '%Y-%m-%d') AS checkin, DATE_FORMAT(checkout, '%Y-%m-%d') AS checkout, qte_pessoa_mais,qte_pessoa_menos, acomodacao, canc_free, ativo FROM reservas where id_reserva=?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaReservas = [];
        for (const row of rows) {
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo']);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }
}