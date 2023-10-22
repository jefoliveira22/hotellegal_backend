import Consumo from "../Modelo/consumo.js";
import Usuario from "../Modelo/usuario.js";
import Cliente from "../Modelo/cliente.js";
import Reserva from "../Modelo/reserva.js";
import Hospedagem from "../Modelo/hospedagem.js";
import Itens_Consumo from "../Modelo/itensconsumo.js";
import Produto from "../Modelo/produto.js";

import conectar from "./conexao.js";

export default class ConsumoBD {
    async incluir(consumo) {
        if (consumo instanceof Consumo) {
            const conexao = await conectar();
            const sql = "INSERT INTO consumos(id_hospedagem, data_cons, desconto, valor) VALUES(?,?,?,?)";
            const valores = [consumo.hospedagem, consumo.data_cons, consumo.desconto, consumo.valor];
            const resultado = await conexao.query(sql, valores);
            return await resultado[0].insertId; 
        }
    }

    async alterar(consumo) {
        if (consumo instanceof Consumo) {
            const conexao = await conectar();
            const sql = "UPDATE consumos SET id_hospedagem=?, data_cons=?, desconto=?, valor=? WHERE id_consumo=?";
            const valores = [consumo.id_hospedagem, consumo.data_cons, consumo.desconto, consumo.valor, consumo.id_consumo];
            await conexao.query(sql, valores);
        }
    }

    async excluir(consumo) {
        if (consumo instanceof Consumo) {
            const conexao = await conectar();
            const sql = "DELETE FROM consumos WHERE id_consumo=?";
            const valores = [consumo.id_consumo];
            await conexao.query(sql, valores);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumos INNER JOIN hospedagem ON consumos.id_hospedagem = hospedagem.id_hospedagem  INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva  INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id;";
        const [rows] = await conexao.query(sql);
        const listaConsumo = [];
        const consumofunc = new ConsumoBD();
        for (const row of rows) {
            let listaProdutos = await consumofunc.consultaDetalhada(row['id_consumo']);
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo = new Consumo(row['id_consumo'], row['data_cons'], row['desconto'], row['valor'], listaProdutos, hospedagem);
            listaConsumo.push(consumo);
        }
        return listaConsumo;
    }
    
    async consultarNome(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumos INNER JOIN hospedagem ON consumos.id_hospedagem = hospedagem.id_hospedagem INNER JOIN reservas ON hospedagem.id_reserva = reservas.id_reserva INNER JOIN clientes ON reservas.cpf_hosp = clientes.cpf INNER JOIN usuarios ON clientes.usuario_id = usuarios.usuario_id WHERE usuarios.nome LIKE ?;";
        const valores = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, valores);
        const listaConsumo = [];
        const consumofunc = new ConsumoBD();
        for (const row of rows) {
            let listaProdutos = await consumofunc.consultaDetalhada(row['id_consumo']);
            const usuario = new Usuario(row['usuario_id'], row['nome'], row['email'], row['endereco'], row['telefone'], row['cidade'], row['estado'], row['cep'], row['tipo_usuario']);
            const hospede = new Cliente(row['cliente_id'], row['cpf'], row['datanasc'], row['nacionalidade'], row['profissao'], row['sexo'], row['senha'], usuario);
            const reserva = new Reserva(row['id_reserva'], row['checkin'], row['checkout'], row['qte_pessoa_mais'], row['qte_pessoa_menos'], row['acomodacao'], row['canc_free'], row['ativo'], hospede);
            const hospedagem = new Hospedagem(row['id_hospedagem'], row['data_ini'], row['data_fim'], row['valor_tot'], row['h_ativo'], reserva);
            const consumo = new Consumo(row['id_consumo'], row['data_cons'], row['desconto'], row['valor'], listaProdutos, hospedagem);
            listaConsumo.push(consumo);
        }
        return listaConsumo;
    }

    async consultarID(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM consumos WHERE id_hospedagem = ?";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const listaConsumo = [];
        for (const row of rows) {
            const hospedagem = new Hospedagem(row['id_hospedagem']);
            const consumo = new Consumo(row['id_consumo'], row['data_cons'], row['desconto'], row['valor'], hospedagem);
            listaConsumo.push(consumo);
        }
        return listaConsumo;
    }

    async consultaDetalhada(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM itens_consumo INNER JOIN produtos ON itens_consumo.id_prod = produtos.id_prod WHERE itens_consumo.id_consumo = ?;";
        const valores = [id];
        const [rows] = await conexao.query(sql, valores);
        const lista = [];
        for (const row of rows) {
            const produto = new Produto(row['id_prod'], row['nome_prod'], row['descricao'], row['preco']);
            const itens = new Itens_Consumo(row['id_prod'], row['id_consumo'], row['qte_prod'], row['valor_prod'], produto);
            lista.push(itens);
        }
        return lista;
    }
}