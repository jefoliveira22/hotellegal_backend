import Fornecedor from "../Modelo/fornecedor.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class FornecedorBD {
    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = "INSERT INTO fornecedores(usuario_id,razao_social,cnpj,ie,categoria) VALUES(?,?,?,?,?)";
            const valores = [fornecedor.usuario.usuario_id, fornecedor.razao_social, fornecedor.cnpj, fornecedor.ie, fornecedor.categoria];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = "UPDATE fornecedores SET fornecedor_id=?,razao_social=?,cnpj=?,ie=?,categoria=? where usuario_id=?";
            const valores = [fornecedor.fornecedor_id, fornecedor.razao_social, fornecedor.cnpj, fornecedor.ie, fornecedor.categoria, fornecedor.usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM fornecedores INNER JOIN usuarios ON fornecedores.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listafornecedores = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const fornecedor = new Fornecedor(row['fornecedor_id'], row['razao_social'], row['cnpj'], row['ie'], row['categoria'], usuario);
            listafornecedores.push(fornecedor);
        }
        return listafornecedores;
    }

    async consultarID(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM fornecedores INNER JOIN usuarios ON fornecedores.usuario_id = usuarios.usuario_id WHERE usuarios.nome LIKE ?";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listafornecedores = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const fornecedor = new Fornecedor(row['fornecedor_id'], row['razao_social'], row['cnpj'], row['ie'], row['categoria'], usuario);
            listafornecedores.push(fornecedor);
        }
        return listafornecedores;
    }
}