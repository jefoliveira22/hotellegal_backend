import Atividadecamareiro from "../Modelo/atividadecamareiro.js";
import conectar from "./conexao.js";

export default class AtividadecamareiroBD {
    async incluir(atividadecamareiro) {
        if (atividadecamareiro instanceof Atividadecamareiro) {
            const conexao = await conectar();
            const sql = "INSERT INTO atividade_camareiro(cpf_cam, descricao, prioridade, tempoMedioDuracaoMin) VALUES(?,?,?,?)";
            const valores = [atividadecamareiro.cpf_cam, atividadecamareiro.descricao, atividadecamareiro.prioridade, atividadecamareiro.tempoMedioDuracaoMin];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(atividadecamareiro) {
        if (atividadecamareiro instanceof Atividadecamareiro) {
            const conexao = await conectar();
            const sql = "UPDATE atividade_camareiro SET cpf_cam=?, descricao=?, prioridade=?, tempoMedioDuracaoMin=? where id_atv=?";
            const valores = [atividadecamareiro.cpf_cam, atividadecamareiro.descricao, atividadecamareiro.prioridade, atividadecamareiro.tempoMedioDuracaoMin, atividadecamareiro.id_atv];
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
        const sql = "SELECT * FROM atividade_camareiro";
        const [rows] = await conexao.query(sql);
        const listaAtividadecamareiro = [];
        for (const row of rows) {
            const atividadecamareiro = new Atividadecamareiro(row['id_atv'], row['cpf_cam'], row['descricao'], row['prioridade'], row['tempoMedioDuracaoMin']);
            listaAtividadecamareiro.push(atividadecamareiro);
        }
        return listaAtividadecamareiro;
    }
    
    async consultarCPF(cpf_cam) {
        const conexao = await conectar();
        const sql = "SELECT * FROM atividade_camareiro where cpf_cam = ?";
        const valores = [cpf_cam];
        const [rows] = await conexao.query(sql, valores);
        const listaAtividadecamareiro = [];
        for (const row of rows) {
            const atividadecamareiro = new Atividadecamareiro(row['id_atv'], row['cpf_cam'], row['descricao'], row['prioridade'], row['tempoMedioDuracaoMin']);
            listaAtividadecamareiro.push(atividadecamareiro);
        }
        return listaAtividadecamareiro;
    }
}