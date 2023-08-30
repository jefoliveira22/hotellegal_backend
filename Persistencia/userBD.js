import User from "../Modelo/user.js";
import conectar from "./conexao.js";

export default class UserBD {
    async incluir(user) {
        if (user instanceof User) {
            const conexao = await conectar();
            const sql = "INSERT INTO users(usuario, senha, tipo) VALUES(?,?,?)";
            const valores = [user.usuario, user.senha, user.tipo];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(user) {
        if (user instanceof User) {
            const conexao = await conectar();
            const sql = "UPDATE users SET senha=?, tipo=? WHERE usuario=?";
            const valores = [user.senha, user.tipo, user.usuario];
            await conexao.query(sql, valores);
        }
    }

    async excluir(user) {
        if (user instanceof User) {
            const conexao = await conectar();
            const sql = "DELETE FROM users WHERE usuario=?";
            const valores = [user.usuario];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM users";
        const [rows] = await conexao.query(sql);
        const listaUser = [];
        for (const row of rows) {
            const user = new User(row['usuario'], row['senha'], row['tipo']);
            listaUser.push(user);
        }
        return listaUser;
    }

    async consultarNome(logincpf) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM users WHERE usuario LIKE ?';
        const valores = [logincpf];
        const [rows] = await conexao.query(sql, valores);
        const listaUser = [];
        for (const row of rows) {
            const user = new User(row['usuario'], row['senha'], row['tipo']);
            listaUser.push(user);
        }
        return listaUser;
    }
}