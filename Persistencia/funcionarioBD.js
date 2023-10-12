import Funcionario from "../Modelo/funcionario.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class FuncionarioBD {
    async incluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = "INSERT INTO funcionarios(usuario_id,cargo,salario) VALUES(?,?,?)";            
            const valores = [funcionario.usuario.usuario_id, funcionario.cargo, funcionario.salario];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = "UPDATE funcionarios SET funcionario_id=?,cargo=?,salario=? where usuario_id=?";
            const valores = [funcionario.funcionario_id, funcionario.cargo, funcionario.salario, funcionario.usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = "DELETE FROM funcionarios WHERE funcionario_id=?";
            const valores = [funcionario.funcionario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM funcionarios INNER JOIN usuarios ON funcionarios.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaFuncionarios = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const funcionario = new Funcionario(row['funcionario_id'],row['cargo'], row['salario'], usuario);
            listaFuncionarios.push(funcionario);
        }
        return listaFuncionarios;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM funcionarios INNER JOIN usuarios ON funcionarios.usuario_id = usuarios.usuario_id WHERE usuarios.nome LIKE ?";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaFuncionarios = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const funcionario = new Funcionario(row['funcionario_id'],row['cargo'], row['salario'], usuario);
            listaFuncionarios.push(funcionario);
        }
        return listaFuncionarios;
    }
}