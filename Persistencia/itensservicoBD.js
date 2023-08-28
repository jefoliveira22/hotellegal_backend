import Itens_Servico from "../Modelo/itensservico.js";
import conectar from "./conexao.js";

export default class Itens_ServicoBD {
    async incluir(itens_servico) {
        const conexao = await conectar();
        for (const servico of itens_servico.listaServicos) {
            const sql = "INSERT INTO itens_servicos(id_servico, id_consumo_serv, qtd_serv, valor_serv) VALUES(?,?,?,?)"
            const valores = [servico.id_servico, itens_servico.id_consumo_serv, servico.qtd_serv, servico.valor_serv];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_servicos";
        const [rows] = await conexao.query(sql);
        const listaItens = [];
        for (const row of rows) {
            const itens = new Itens_Servico(row['id_servico'], row['id_consumo_serv'], row['qtd_serv'], row['valor_serv']);
            listaItens.push(itens);
        }
        return listaItens;
    }

    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_servicos WHERE id_servico = ?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaItens = [];
        for (const row of rows) {
            const itens = new Itens_Servico(row['id_servico'], row['id_consumo_serv'], row['qtd_serv'], row['valor_serv']);
            listaItens.push(itens);
        }
        return listaItens;
    }
}