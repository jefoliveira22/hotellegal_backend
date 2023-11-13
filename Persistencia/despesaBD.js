import Despesa from "../Modelo/despesa.js";
import conectar from "./conexao.js";
import Usuario from "../Modelo/usuario.js";
import Fornecedor from "../Modelo/fornecedor.js";

export default class DespesaBD {
    async incluir(despesa) {
        if (despesa instanceof Despesa) {
            const conexao = await conectar();
            const sql = "INSERT INTO despesas(cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago) VALUES(?,?,?,?,?,?,?,?)";
            const valores = [despesa.cod_tipo_despesa, despesa.nome_desp, despesa.nfe, despesa.fornecedor, despesa.data_comp, despesa.valortotal, despesa.obs, despesa.pago];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(despesa) {
        if (despesa instanceof Despesa) {
            const conexao = await conectar();
            const sql = "UPDATE despesas SET cod_tipo_despesa=?, nome_desp=?, nfe=?, fornecedor=?, data_comp=?, valortotal=?, obs=?, pago=? where id_despesa=?";
            const valores = [despesa.cod_tipo_despesa, despesa.nome_desp, despesa.nfe, despesa.fornecedor, despesa.data_comp, despesa.valortotal, despesa.obs, despesa.pago, despesa.id_despesa];
            await conexao.query(sql, valores);
        }
    }

    async excluir(despesa) {
        if (despesa instanceof Despesa) {
            const conexao = await conectar();
            const sql = "DELETE FROM despesas WHERE id_despesa=?";
            const valores = [despesa.id_despesa];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM despesas INNER JOIN fornecedores ON despesas.fornecedor = fornecedores.fornecedor_id INNER JOIN usuarios ON fornecedores.usuario_id = usuarios.usuario_id;";
        const [rows] = await conexao.query(sql);
        const listaDespesa = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const fornecedor = new Fornecedor(row['fornecedor_id'], row['razao_social'], row['cnpj'], row['ie'], row['categoria'], usuario);
            const despesa = new Despesa(row['id_despesa'], row['cod_tipo_despesa'], row['nome_desp'], row['nfe'], fornecedor, row['data_comp'], row['valortotal'], row['obs'], row['pago']);
            listaDespesa.push(despesa);
        }
        return listaDespesa;
    }
    
    async consultarID(id_despesa) {
        const conexao = await conectar();
        const sql = "SELECT * FROM despesas INNER JOIN fornecedores ON despesas.fornecedor = fornecedores.fornecedor_id INNER JOIN usuarios ON fornecedores.usuario_id = usuarios.usuario_id WHERE id_despesa = ?;";
        const valores = [id_despesa];
        const [rows] = await conexao.query(sql, valores);
        const listaDespesa = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const fornecedor = new Fornecedor(row['fornecedor_id'], row['razao_social'], row['cnpj'], row['ie'], row['categoria'], usuario);
            const despesa = new Despesa(row['id_despesa'], row['cod_tipo_despesa'], row['nome_desp'], row['nfe'], fornecedor, row['data_comp'], row['valortotal'], row['obs'], row['pago']);
            listaDespesa.push(despesa);
        }
        return listaDespesa;
    }

    async consultarPeriodo(data_comp) {
        const conexao = await conectar();
        const sql = "SELECT * FROM despesas WHERE data_comp BETWEEN ? AND ?";
        const valores = [data_comp, data_comp];
        const [rows] = await conexao.query(sql, valores);
        const listaDespesa = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const fornecedor = new Fornecedor(row['fornecedor_id'], row['razao_social'], row['cnpj'], row['ie'], row['categoria'], usuario);
            const despesa = new Despesa(row['id_despesa'], row['cod_tipo_despesa'], row['nome_desp'], row['nfe'], fornecedor, row['data_comp'], row['valortotal'], row['obs'], row['pago']);
            listaDespesa.push(despesa);
        }
        return listaDespesa;
    }
}