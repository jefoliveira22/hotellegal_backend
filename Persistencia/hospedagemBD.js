import Hospedagem from "../Modelo/hospedagem.js";
import Reserva from "../Modelo/reserva.js";
import Usuario from "../Modelo/usuario.js";
import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";

export default class HospedagemBD {
    async incluir(hospedagem) {
        if (hospedagem instanceof Hospedagem) {
            const conexao = await conectar();
            const sql = "INSERT INTO hospedagem(id_reserva, data_ini, data_fim, valor_tot, h_ativo) VALUES(?,?,?,?,?)";
            const valores = [hospedagem.reserva.id_reserva, hospedagem.data_ini, hospedagem.data_fim, hospedagem.valor_tot, hospedagem.h_ativo];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(hospedagem) {
        if (hospedagem instanceof Hospedagem) {
            const conexao = await conectar();
            const sql = "UPDATE hospedagem SET id_reserva=?, data_ini=?, data_fim=?, valor_tot=?, h_ativo=? where id_hospedagem=?";
            const valores = [hospedagem.reserva.id_reserva, hospedagem.data_ini, hospedagem.data_fim, hospedagem.valor_tot, hospedagem.h_ativo, hospedagem.id_hospedagem];
            await conexao.query(sql, valores);
        }
    }

    async excluir(hospedagem) {
        if (hospedagem instanceof Hospedagem) {
            const conexao = await conectar();
            const sql = "DELETE FROM hospedagem WHERE id_hospedagem=?";
            const valores = [hospedagem.id_hospedagem];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaHospedagem = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            listaHospedagem.push(hospedagem);
        }
        return listaHospedagem;
    }
    
    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM hospedagem WHERE id_hospedagem=?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaHospedagem = [];
        for (const row of rows) {
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo']);
            listaHospedagem.push(hospedagem);
        }
        return listaHospedagem;
    }
}