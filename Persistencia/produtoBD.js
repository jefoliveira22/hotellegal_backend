import Produto from "../Modelo/produto.js";
import conectar from "./conexao.js";

export default class ProdutoBD {
    async incluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "INSERT INTO produtos(nome_prod, descricao, preco) VALUES(?,?,?)";
            const valores = [produto.nome_prod, produto.descricao, produto.preco];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "UPDATE produtos SET nome_prod=?, descricao=?, preco=? WHERE id_prod=?";
            const valores = [produto.nome_prod, produto.descricao, produto.preco, produto.id_prod];
            await conexao.query(sql, valores);
        }
    }

    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "DELETE FROM produtos WHERE id_prod=?";
            const valores = [produto.id_prod];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM produtos";
        const [rows] = await conexao.query(sql);
        const listaProduto = [];
        for (const row of rows) {
            const produto = new Produto(row['id_prod'], row['nome_prod'], row['descricao'], row['preco']);
            listaProduto.push(produto);
        }
        return listaProduto;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM produtos WHERE nome_prod LIKE ?";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaProduto = [];
        for (const row of rows) {
            const produto = new Produto(row['id_prod'], row['nome_prod'], row['descricao'], row['preco']);
            listaProduto.push(produto);
        }
        return listaProduto;
    }
}