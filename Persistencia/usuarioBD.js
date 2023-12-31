import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";

export default class UsuarioBD {
    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "INSERT INTO usuarios(nome,email,endereco,telefone,cidade,estado,cep,tipo_usuario) VALUES(?,?,?,?,?,?,?,?)";
            const valores = [usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "UPDATE usuarios SET nome=?, email=?, endereco=?, telefone=?, cidade=?, estado=?, cep=?, tipo_usuario=? where usuario_id=?";
            const valores = [usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario, usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "DELETE FROM usuarios WHERE usuario_id=?";
            const valores = [usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM usuarios";
        const [rows] = await conexao.query(sql);
        const listausuario = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            listausuario.push(usuario);
        }
        return listausuario;
    }

    async consultarID(usuario_id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM usuarios where usuario_id=?";
        const valores = [usuario_id];
        const [rows] = await conexao.query(sql, valores);
        const listausuario = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            listausuario.push(usuario);
        }
        return listausuario;
    }

}