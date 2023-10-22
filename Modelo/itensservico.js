import Itens_ServicoBD from "../Persistencia/itensservicoBD.js";

export default class Itens_Servico {

    #id_servico
    #id_consumo_serv
    #qtd_serv
    #valor_serv
    #servico
    
  
    constructor(id_servico, id_consumo_serv, qtd_serv, valor_serv, servico) {
        this.#id_servico = id_servico;
        this.#id_consumo_serv = id_consumo_serv;
        this.#qtd_serv = qtd_serv;
        this.#valor_serv = valor_serv;
        this.#servico = servico;
    }
    
    get id_servico() {
        return this.#id_servico;
    }

    set id_servico(pid_servico) {
        this.#id_servico = pid_servico;
    }

    get id_consumo_serv() {
        return this.#id_consumo_serv;
    }

    set id_consumo_serv(pid_consumo_serv) {
        this.#id_consumo_serv = pid_consumo_serv;
    }

    get qtd_serv() {
        return this.#qtd_serv;
    }

    set qtd_serv(pqtd_serv) {
        this.#qtd_serv = pqtd_serv;
    }

    get valor_serv() {
        return this.#valor_serv;
    }

    set valor_serv(pvalor_serv) {
        this.#valor_serv = pvalor_serv;
    } 

    get servico() {
        return this.#servico;
    }

    set servico(pservico) {
        this.#servico = pservico;
    } 

    toJSON() {
        return {
            "id_servico" : this.#id_servico,
            "id_consumo_serv" : this.#id_consumo_serv,
            "qtd_serv" : this.#qtd_serv,
            "valor_serv" : this.#valor_serv,
            "servico": this.#servico
        }
    }

    async gravar() {
        const itens_servicoBD = new Itens_ServicoBD();
        await itens_servicoBD.incluir(this);
    }
    
    async consultar() {
        const itens_servicoBD = new Itens_ServicoBD();
        const itens = await itens_servicoBD.consultar();
        return itens;
    }

    async consultarID(id) {
        const itens_servicoBD = new Itens_ServicoBD();
        const itens = await itens_servicoBD.consultarID(id);
        return itens;
    }
}