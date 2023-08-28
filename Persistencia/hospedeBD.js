import Hospede from "../Modelo/hospede.js";
import conectar from "./conexao.js";

export default class HospedeBD {
    async incluir(hospede) {
        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "INSERT INTO hospedes(cpf, nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
            const valores = [hospede.cpf, hospede.nome, hospede.datanasc, hospede.email, hospede.telefone, hospede.endereco, hospede.cidade, hospede.estado, hospede.cep, hospede.profissao, hospede.nacionalidade, hospede.sexo];
            await conexao.query(sql, valores);
        }
    }

    async alterar(hospede) {
        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "UPDATE hospedes SET nome=?, datanasc=?, email=?, telefone=?, endereco=?, cidade=?, estado=?, cep=?, profissao=?, sexo=?, nacionalidade=? WHERE cpf=?";
            const valores = [hospede.nome, hospede.datanasc, hospede.email, hospede.telefone, hospede.endereco, hospede.cidade, hospede.estado, hospede.cep, hospede.profissao, hospede.sexo, hospede.nacionalidade, hospede.cpf];
            await conexao.query(sql, valores);
        }
    }

    async excluir(hospede) {
        if (hospede instanceof Hospede) {
            const conexao = await conectar();
            const sql = "DELETE FROM hospedes WHERE cpf=?";
            const valores = [hospede.cpf];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM hospedes";
        const [rows] = await conexao.query(sql);
        const listaHospedes = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM hospedes WHERE nome LIKE ?';
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for (const row of rows) {
            const hospede = new Hospede(row['cpf'], row['nome'], row['datanasc'], row['email'], row['telefone'], row['endereco'], row['cidade'], row['estado'], row['cep'], row['profissao'], row['nacionalidade'], row['sexo']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }
}