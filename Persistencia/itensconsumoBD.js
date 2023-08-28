import Itens_Consumo from "../Modelo/itensconsumo.js";
import conectar from "./conexao.js";

export default class Itens_ConsumoBD {
    async incluir(itens_consumo) {
        const conexao = await conectar();
        for (const produto of itens_consumo.listaProdutos) {
            const sql = "INSERT INTO itens_consumo(id_prod, id_consumo, qte_prod, valor_prod) VALUES(?,?,?,?)"
            const valores = [produto.id_prod, itens_consumo.id_consumo, produto.qtde, produto.preco];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_consumo";
        const [rows] = await conexao.query(sql);
        const listaItens = [];
        for (const row of rows) {
            const itens = new Itens_Consumo(row['id_prod'], row['id_consumo'], row['qte_prod'], row['valor_prod']);
            listaItens.push(itens);
        }
        return listaItens;
    }

    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_consumo WHERE id_prod = ?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaItens = [];
        for (const row of rows) {
            const itens = new Itens_Consumo(row['id_prod'], row['id_consumo'], row['qte_prod'], row['valor_prod']);
            listaItens.push(itens);
        }
        return listaItens;
    }
}