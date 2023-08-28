import Consumo_ServBD from "../Persistencia/consumo_servBD.js";
import Itens_ServicoBD from "../Persistencia/itensservicoBD.js";

export default class Consumo_Serv {

    #id_consumo_serv
    #data_serv
    #desconto_serv
    #valor_serv
    #listaServicos
    #hospedagem
    
  
    constructor(id_consumo_serv, data_serv, desconto_serv, valor_serv, listaServicos, hospedagem) {
        this.#id_consumo_serv = id_consumo_serv;
        this.#data_serv = data_serv;
        this.#desconto_serv = desconto_serv;
        this.#valor_serv = valor_serv;
        this.#listaServicos = listaServicos;
        this.#hospedagem = hospedagem;
    }
    
    get id_consumo_serv() {
        return this.#id_consumo_serv;
    }

    set id_consumo_serv(pid_consumo_serv) {
        this.#id_consumo_serv = pid_consumo_serv;
    }

    get data_serv() {
        return this.#data_serv;
    }

    set data_serv(pdata_serv) {
        this.#data_serv = pdata_serv;
    }

    get desconto_serv() {
        return this.#desconto_serv;
    }

    set desconto_serv(pdesconto_serv) {
        this.#desconto_serv = pdesconto_serv;
    }

    get valor_serv() {
        return this.#valor_serv;
    }

    set valor_serv(novovalor_serv) {
        this.#valor_serv = novovalor_serv;
    }

    get listaServicos() {
        return this.#listaServicos;
    }

    set listaServicos(plistaServicos) {
        this.#listaServicos = plistaServicos;
    }

    get hospedagem() {
        return this.#hospedagem;
    }

    set hospedagem(pid_hospedagem) {
        this.#hospedagem = pid_hospedagem;
    }

    toJSON() {
        return {
            "id_consumo_serv" : this.#id_consumo_serv,
            "data_serv" : this.#data_serv,
            "desconto_serv" : this.#desconto_serv,
            "valor_serv" : this.#valor_serv,
            "listaServicos" : this.#listaServicos,
            "hospedagem" : this.#hospedagem,
        }
    }

    async gravar() {
        const consumo_servBD = new Consumo_ServBD();
        this.#id_consumo_serv = await consumo_servBD.incluir(this);
        const itensservicoBD = new Itens_ServicoBD();
        await itensservicoBD.incluir(this);
    }

    async atualizar() {
        const consumo_servBD = new Consumo_ServBD();
        await consumo_servBD.alterar(this);
    }

    async removerBanco() {
        const consumo_servBD = new Consumo_ServBD();
        await consumo_servBD.excluir(this);
    }

    async consultar() {
        const consumo_servBD = new Consumo_ServBD();
        const consumos_serv = await consumo_servBD.consultar();
        return consumos_serv;
    }

    async consultarNome(nome) {
        const consumo_servBD = new Consumo_ServBD();
        const consumos_serv = await consumo_servBD.consultarNome(nome);
        return consumos_serv;
    }

    async consultarID(id) {
        const consumo_servBD = new Consumo_ServBD();
        const consumos_serv = await consumo_servBD.consultarID(id);
        return consumos_serv;
    }
}