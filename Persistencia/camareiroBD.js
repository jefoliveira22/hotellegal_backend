import Camareiro from "../Modelo/camareiro.js";
import conectar from "./conexao.js";

export default class CamareiroBD {
    async incluir(camareiro) {
        if (camareiro instanceof Camareiro) {
            const conexao = await conectar();
            const sql = "INSERT INTO camareiro(cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero) VALUES(?,?,?,?,?,?,?,?,?)";
            const valores = [camareiro.cpf_cam, camareiro.nome_cam, camareiro.data_nasc, camareiro.endereco_cam, camareiro.bairro, camareiro.cidade_cam, camareiro.uf_cam, camareiro.nis, camareiro.genero];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertCPF;
        }
    }

    async alterar(camareiro) {
        if (camareiro instanceof Camareiro) {
            const conexao = await conectar();
            const sql = "UPDATE camareiro SET nome_cam=?, data_nasc=?, endereco_cam=?, bairro=?, cidade_cam=?, uf_cam=?, nis=?, genero=? where cpf_cam=?";
            const valores = [camareiro.nome_cam, camareiro.data_nasc, camareiro.endereco_cam, camareiro.bairro, camareiro.cidade_cam, camareiro.uf_cam, camareiro.nis, camareiro.genero, camareiro.cpf_cam];
            await conexao.query(sql, valores);
        }
    }

    async excluir(camareiro) {
        if (camareiro instanceof Camareiro) {
            const conexao = await conectar();
            const sql = "DELETE FROM camareiro WHERE cpf_cam=?";
            const valores = [camareiro.cpf_cam];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT cpf_cam, nome_cam, DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero FROM camareiro";
        const [rows] = await conexao.query(sql);
        const listaCamareiro = [];
        for (const row of rows) {
            const camareiro = new Camareiro(row['cpf_cam'], row['nome_cam'], row['data_nasc'], row['endereco_cam'], row['bairro'], row['cidade_cam'], row['uf_cam'], row['nis'], row['genero']);
            listaCamareiro.push(camareiro);
        }
        return listaCamareiro;
    }
    
    async consultarCPF(cpf_cam) {
        const conexao = await conectar();
        const sql = "SELECT cpf_cam, nome_cam, DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero FROM camareiro where cpf_cam = ?";
        const valores = [cpf_cam];
        const [rows] = await conexao.query(sql, valores);
        const listaCamareiro = [];
        for (const row of rows) {
            const camareiro = new Camareiro(row['cpf_cam'], row['nome_cam'], row['data_nasc'], row['endereco_cam'], row['bairro'], row['cidade_cam'], row['uf_cam'], row['genero']);
            listaCamareiro.push(camareiro);
        }
        return listaCamareiro;
    }
}