import Servico from "../Modelo/servico.js";
import conectar from "./conexao.js";

export default class ServicoBD {
    async incluir(servico) {
        if (servico instanceof Servico) {
            const conexao = await conectar();
            const sql = "INSERT INTO servicos(nome_serv, descricao_serv, valor) VALUES(?,?,?)";
            const valores = [servico.nome_serv, servico.descricao_serv, servico.valor];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId;
        }
    }

    async alterar(servico) {
        if (servico instanceof Servico) {
            const conexao = await conectar();
            const sql = "UPDATE servicos SET nome_serv=?, descricao_serv=?, valor=? where id_servico=?";
            const valores = [servico.nome_serv, servico.descricao_serv, servico.valor, servico.id_servico];
            await conexao.query(sql, valores);
        }
    }

    async excluir(servico) {
        if (servico instanceof Servico) {
            const conexao = await conectar();
            const sql = "DELETE FROM servicos WHERE id_servico=?";
            const valores = [servico.id_servico];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM servicos";
        const [rows] = await conexao.query(sql);
        const listaServicos = [];
        for (const row of rows) {
            const servico = new Servico(row['id_servico'], row['nome_serv'], row['descricao_serv'], row['valor']);
            listaServicos.push(servico);
        }
        return listaServicos;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM servicos WHERE nome_serv LIKE ?";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaServicos = [];
        for (const row of rows) {
            const servico = new Servico(row['id_servico'], row['nome_serv'], row['descricao_serv'], row['valor']);
            listaServicos.push(servico);
        }
        return listaServicos;
    }
}