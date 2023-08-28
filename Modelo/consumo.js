import ConsumoBD from "../Persistencia/consumoBD.js";
import Itens_ConsumoBD from "../Persistencia/itensconsumoBD.js";

export default class Consumo {

    #id_consumo
    #data_cons
    #desconto
    #valor
    #listaProdutos
    #hospedagem
    
  
    constructor(id_consumo, data_cons, desconto, valor, listaProdutos, hospedagem) {
        this.#id_consumo = id_consumo;
        this.#data_cons = data_cons;
        this.#desconto = desconto;
        this.#valor = valor;
        this.#listaProdutos = listaProdutos;
        this.#hospedagem = hospedagem;
    }
    
    get id_consumo() {
        return this.#id_consumo;
    }

    set id_consumo(pid_consumo) {
        this.#id_consumo = pid_consumo;
    }

    get data_cons() {
        return this.#data_cons;
    }

    set data_cons(pdata_cons) {
        this.#data_cons = pdata_cons;
    }

    get desconto() {
        return this.#desconto;
    }

    set desconto(pdesconto) {
        this.#desconto = pdesconto;
    }

    get valor() {
        return this.#valor;
    }

    set valor(novovalor) {
        this.#valor = novovalor;
    }

    get listaProdutos() {
        return this.#listaProdutos;
    }

    set listaProdutos(plistaProdutos) {
        this.#listaProdutos = plistaProdutos;
    }

    get hospedagem() {
        return this.#hospedagem;
    }

    set hospedagem(pid_hospedagem) {
        this.#hospedagem = pid_hospedagem;
    }

    toJSON() {
        return {
            "id_consumo" : this.#id_consumo,
            "data_cons" : this.#data_cons,
            "desconto" : this.#desconto,
            "valor" : this.#valor,
            "listaProdutos" : this.#listaProdutos,
            "hospedagem" : this.#hospedagem,
        }
    }

    async gravar() {
        const consumoBD = new ConsumoBD();
        this.#id_consumo = await consumoBD.incluir(this);
        const itensconsumoBD = new Itens_ConsumoBD();
        await itensconsumoBD.incluir(this);
    }

    async atualizar() {
        const consumoBD = new ConsumoBD();
        await consumoBD.alterar(this);
    }

    async removerBanco() {
        const consumoBD = new ConsumoBD();
        await consumoBD.excluir(this);
    }

    async consultar() {
        const consumoBD = new ConsumoBD();
        const consumos = await consumoBD.consultar();
        return consumos;
    }

    async consultarNome(nome) {
        const consumoBD = new ConsumoBD();
        const consumos = await consumoBD.consultarNome(nome);
        return consumos;
    }

    async consultarID(id) {
        const consumoBD = new ConsumoBD();
        const consumos = await consumoBD.consultarID(id);
        return consumos;
    }
}