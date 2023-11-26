import Reserva from "../Modelo/reserva.js";
import conectar from "./conexao.js";
import Usuario from "../Modelo/usuario.js";
import Cliente from "../Modelo/cliente.js";

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
        const sql = "SELECT * FROM reservas INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE ativo = 'Sim'";
        const [rows] = await conexao.query(sql);
        const listaReservas = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }

    async consultarUltimoID() {
        const conexao = await conectar();
        const sql = "SELECT * FROM reservas INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE id_reserva ORDER BY id_reserva DESC limit 1";
        const [rows] = await conexao.query(sql);
        const listaReservas = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
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

    async consultarPeriodo(dados) {
        const conexao = await conectar();
        const sql = "SELECT * FROM reservas INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE checkin BETWEEN ? AND ?";
        const valores = [dados.inicio, dados.fim];
        const [rows] = await conexao.query(sql, valores);
        const listaReservas = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }

    async consultarHospede(cpf_hosp) {
        const conexao = await conectar();
        const sql = "SELECT * FROM reservas INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE cpf_hosp = ?";
        const valores = [cpf_hosp];
        const [rows] = await conexao.query(sql, valores);
        const listaReservas = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }

    async consultarStatus(ativo) {
        const conexao = await conectar();
        const sql = "SELECT id_reserva, cpf_hosp, DATE_FORMAT(checkin, '%Y-%m-%d') AS checkin, DATE_FORMAT(checkout, '%Y-%m-%d') AS checkout, qte_pessoa_mais,qte_pessoa_menos, acomodacao, canc_free, ativo FROM reservas where ativo=?";
        const valores = [ativo];
        const [rows] = await conexao.query(sql, valores);
        const listaReservas = [];
        for (const row of rows) {
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo']);
            listaReservas.push(reserva);
        }
        return listaReservas;
    }
}