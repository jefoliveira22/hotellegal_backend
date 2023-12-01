import Quarto from "../Modelo/quarto.js";
import conectar from "./conexao.js";

export default class QuartoBD {
    async incluir(quarto) {
        if (quarto instanceof Quarto) {
            const conexao = await conectar();
            const sql = "INSERT INTO quarto(numquarto, nomequarto, descricao, ocupado) VALUES(?,?,?,?)";
            const valores = [quarto.numquarto, quarto.nomequarto, quarto.descricao, quarto.ocupado];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(quarto) {
        if (quarto instanceof Quarto) {
            const conexao = await conectar();
            const sql = "UPDATE quarto SET numquarto=?, nomequarto=?, descricao=?, ocupado=? where idquarto=?";
            const valores = [quarto.numquarto, quarto.nomequarto, quarto.descricao, quarto.ocupado, quarto.idquarto];
            await conexao.query(sql, valores);
        }
    }

    async alterarOcupacao(quarto) {
        if (quarto instanceof Quarto) {
            const conexao = await conectar();
            const sql = "UPDATE quarto SET ocupado=? WHERE nomequarto=?";
            const valores = [quarto.ocupado, quarto.nomequarto];
            await conexao.query(sql, valores);
        }
    }

    async excluir(quarto) {
        if (quarto instanceof Quarto) {
            const conexao = await conectar();
            const sql = "DELETE FROM quarto WHERE idquarto=?";
            const valores = [quarto.idquarto];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM quarto";
        const [rows] = await conexao.query(sql);
        const listaquartos = [];
        for (const row of rows) {
            const quarto = new Quarto(row['idquarto'], row['numquarto'], row['nomequarto'], row['descricao'], row['ocupado']);
            listaquartos.push(quarto);
        }
        return listaquartos;
    }

    async consultarVazio() {
        const conexao = await conectar();
        const sql = "SELECT * FROM quarto WHERE ocupado='N'";
        const [rows] = await conexao.query(sql);
        const listaquartos = [];
        for (const row of rows) {
            const quarto = new Quarto(row['idquarto'], row['numquarto'], row['nomequarto'], row['descricao'], row['ocupado']);
            listaquartos.push(quarto);
        }
        return listaquartos;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM quarto where nomequarto=?";
        const valores = [nome];
        const [rows] = await conexao.query(sql, valores);
        const listaquartos = [];
        for (const row of rows) {
            const quarto = new Quarto(row['idquarto'], row['numquarto'], row['nomequarto'], row['descricao'], row['ocupado']);
            listaquartos.push(quarto);
        }
        return listaquartos;
    }
}