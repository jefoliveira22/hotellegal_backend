import TipoDespesa from "../Modelo/tipodespesa.js";
import conectar from "./conexao.js";

export default class TipoDespesaBD {
    async incluir(tdespesa) {
        if (tdespesa instanceof TipoDespesa) {
            const conexao = await conectar();
            const sql = "INSERT INTO tipos_despesa(cod_tipo_desp, descr) VALUES(?,?)";
            const valores = [tdespesa.cod_tipo_desp, tdespesa.descr];
            await conexao.query(sql, valores);
        }
    }

    async alterar(tdespesa) {
        if (tdespesa instanceof TipoDespesa) {
            const conexao = await conectar();
            const sql = "UPDATE tipos_despesa SET descr=? where cod_tipo_desp=?";
            const valores = [tdespesa.descr, tdespesa.cod_tipo_desp];
            await conexao.query(sql, valores);
        }
    }

    async excluir(tdespesa) {
        if (tdespesa instanceof TipoDespesa) {
            const conexao = await conectar();
            const sql = "DELETE FROM tipos_despesa WHERE cod_tipo_desp=?";
            const valores = [tdespesa.cod_tipo_desp];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM tipos_despesa";
        const [rows] = await conexao.query(sql);
        const listaTDespesa = [];
        for (const row of rows) {
            const tdespesa = new TipoDespesa(row['cod_tipo_desp'], row['descr']);
            listaTDespesa.push(tdespesa);
        }
        return listaTDespesa;
    }
    
    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM tipos_despesa where cod_tipo_desp=?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaTDespesa = [];
        for (const row of rows) {
            const tdespesa = new TipoDespesa(row['cod_tipo_desp'], row['descr']);
            listaTDespesa.push(tdespesa);
        }
        return listaTDespesa;
    }
}