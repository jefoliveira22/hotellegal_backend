import Atividadecamareiro from "../Modelo/atividadecamareiro.js";
import Usuario from "../Modelo/usuario.js";
import Funcionario from "../Modelo/funcionario.js";
import conectar from "./conexao.js";

export default class AtividadecamareiroBD {
    async incluir(atividadecamareiro) {
        if (atividadecamareiro instanceof Atividadecamareiro) {
            const conexao = await conectar();
            const sql = "INSERT INTO atividade_camareiro(nis_cam, descricao, prioridade, tempoMedioDuracaoMin) VALUES(?,?,?,?)";
            const valores = [atividadecamareiro.nis_cam, atividadecamareiro.descricao, atividadecamareiro.prioridade, atividadecamareiro.tempoMedioDuracaoMin];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(atividadecamareiro) {
        if (atividadecamareiro instanceof Atividadecamareiro) {
            const conexao = await conectar();
            const sql = "UPDATE atividade_camareiro SET nis_cam=?, descricao=?, prioridade=?, tempoMedioDuracaoMin=? where id_atv=?";
            const valores = [atividadecamareiro.nis_cam, atividadecamareiro.descricao, atividadecamareiro.prioridade, atividadecamareiro.tempoMedioDuracaoMin, atividadecamareiro.id_atv];
            await conexao.query(sql, valores);
        }
    }

    async excluir(atividadecamareiro) {
        if (atividadecamareiro instanceof Atividadecamareiro) {
            const conexao = await conectar();
            const sql = "DELETE FROM atividade_camareiro WHERE id_atv=?";
            const valores = [atividadecamareiro.id_atv];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM atividade_camareiro INNER JOIN funcionarios ON atividade_camareiro.nis_cam = funcionarios.nis INNER JOIN usuarios ON funcionarios.usuario_id = usuarios.usuario_id;";
        const [rows] = await conexao.query(sql);
        const listaAtividadecamareiro = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const nis_cam = new Funcionario(row['funcionario_id'], row['sexo'], row['datanasc'], row['cargo'], row['salario'], row['nis'], row['senha'], usuario);
            const atividadecamareiro = new Atividadecamareiro(row['id_atv'], nis_cam, row['descricao'], row['prioridade'], row['tempoMedioDuracaoMin']);
            listaAtividadecamareiro.push(atividadecamareiro);
        }
        return listaAtividadecamareiro;
    }
    
    async consultarCPF(nis_cam) {
        const conexao = await conectar();
        const sql = "SELECT * FROM atividade_camareiro INNER JOIN funcionarios ON atividade_camareiro.nis_cam = funcionarios.nis INNER JOIN usuarios ON funcionarios.usuario_id = usuarios.usuario_id WHERE nis_cam = ?";
        const valores = [nis_cam];
        const [rows] = await conexao.query(sql, valores);
        const listaAtividadecamareiro = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const nis_cam = new Funcionario(row['funcionario_id'], row['sexo'], row['datanasc'], row['cargo'], row['salario'], row['nis'], row['senha'], usuario);
            const atividadecamareiro = new Atividadecamareiro(row['id_atv'], nis_cam, row['descricao'], row['prioridade'], row['tempoMedioDuracaoMin']);
            listaAtividadecamareiro.push(atividadecamareiro);
        }
        return listaAtividadecamareiro;
    }
}