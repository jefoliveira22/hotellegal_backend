import Cliente from "../Modelo/cliente.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";


export default class ClienteBD {
    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "INSERT INTO clientes(usuario_id,cpf,datanasc,nacionalidade,profissao,sexo,senha) VALUES(?,?,?,?,?,?,?)";            
            const valores = [cliente.usuario.usuario_id, cliente.cpf, cliente.datanasc, cliente.nacionalidade, cliente.profissao, cliente.sexo, cliente.senha];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "UPDATE clientes SET cliente_id=?,cpf=?,datanasc=?,nacionalidade=?,profissao=?,sexo=?,senha=? where usuario_id=?";
            const valores = [cliente.cliente_id, cliente.cpf, cliente.datanasc, cliente.nacionalidade, cliente.profissao, cliente.sexo, cliente.senha, cliente.usuario.usuario_id];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM clientes INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id";
        const [rows] = await conexao.query(sql);
        const listaClientes = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
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
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    async consultarEmail(email) {
        const conexao = await conectar();
        const sql = "SELECT * FROM clientes INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE usuarios.email = ?";
        const valores = [email];
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for (const row of rows) {           
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const cliente = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}