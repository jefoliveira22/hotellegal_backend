import Cliente from "../Modelo/cliente.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class ClienteBD {
    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "INSERT INTO clientes(usuario_id,endereco, telefone) VALUES(?,?,?)";            
            const valores = [cliente.usuario.usuario_id, cliente.endereco, cliente.telefone];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "DELETE FROM clientes WHERE cliente_id=?";
            const valores = [cliente.cliente_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM clientes INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaClientes = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'],row['endereco'], row['telefone'], usuario);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    // async consultarUltimoID() {
    //     const conexao = await conectar();
    //     const sql = "SELECT * FROM reservas INNER JOIN hospedes ON reservas.cpf_hosp = hospedes.cpf WHERE id_reserva ORDER BY id_reserva DESC limit 1";
    //     const [rows] = await conexao.query(sql);
    //     const listaReservas = [];
    //     for (const row of rows) {
    //         const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
    //         const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
    //         listaReservas.push(reserva);
    //     }
    //     return listaReservas;
    // }
    
    // async consultarID(id) {
    //     const conexao = await conectar();
    //     const sql = "SELECT id_reserva, cpf_hosp, DATE_FORMAT(checkin, '%Y-%m-%d') AS checkin, DATE_FORMAT(checkout, '%Y-%m-%d') AS checkout, qte_pessoa_mais,qte_pessoa_menos, acomodacao, canc_free, ativo FROM reservas where id_reserva=?";
    //     const valores = [id];
    //     const [rows] = await conexao.query(sql, valores);
    //     const listaReservas = [];
    //     for (const row of rows) {
    //         const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo']);
    //         listaReservas.push(reserva);
    //     }
    //     return listaReservas;
    // }
}