import Cliente from "../Modelo/cliente.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class ClienteBD {
    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "INSERT INTO clientes(usuario_id,endereco, telefone) VALUES(?,?,?)";            
            const valores = [cliente.usuario.usuario_id, cliente.endereco, cliente.telefone];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "UPDATE clientes SET cliente_id=?,endereco=?,telefone=? where usuario_id=?";
            const valores = [cliente.cliente_id, cliente.endereco, cliente.telefone, cliente.usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM clientes INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaClientes = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'],row['endereco'], row['telefone'], usuario);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM clientes INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE usuarios.nome LIKE ?";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['senha'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'],row['endereco'], row['telefone'], usuario);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}