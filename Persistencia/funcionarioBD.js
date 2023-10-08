import Funcionario from "../Modelo/funcionario.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class FuncionarioBD {
    async incluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = "INSERT INTO funcionarios(funcionario_id, usuario_id,cargo,salario) VALUES(?,?,?,?)";            
            const valores = [funcionario.funcionario_id, funcionario.usuario.usuario_id, funcionario.cargo, funcionario.salario];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }


    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = "DELETE FROM funcionarios WHERE funcionario_id=?";
            const valores = [funcionario.funcionario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM funcionarios INNER JOIN usuarios ON funcionarios.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaFuncionarios = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const funcionario = new Funcionario(usuario,row['funcionario_id'],row['cargo'], row['salario']);
            listaFuncionarios.push(funcionario);
        }
        return listaFuncionarios;
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