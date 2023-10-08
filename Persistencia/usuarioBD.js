import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";

export default class UsuarioBD {
    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "INSERT INTO usuarios(usuario_id,nome,email,senha,tipo_usuario) VALUES(?,?,?,?,?)";
            const valores = [usuario.usuario_id, usuario.nome, usuario.email, usuario.senha, usuario.tipo_usuario];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertID;
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "UPDATE usuarios SET nome=?, email=?, senha=?, where usuario_id=?";
            const valores = [usuario.nome, usuario.email, usuario.senha, usuario.tipo_usuario,usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = "DELETE FROM usuarios WHERE usuario_id=?";
            const valores = [usuario];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM usuarios";
        const [rows] = await conexao.query(sql);
        const listausuario = [];
        for (const row of rows) {
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
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
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            listausuario.push(usuario);
        }
        return listausuario;
    }
    
}