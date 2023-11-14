import HospedagemBD from "../Persistencia/hospedagemBD.js";

export default class Hospedagem {

    #id_hospedagem
    #data_ini
    #data_fim
    #valor_tot
    #h_ativo
    #reserva
    
  
    constructor(id_hospedagem, data_ini, data_fim, valor_tot, h_ativo, reserva) {
        this.#id_hospedagem = id_hospedagem;
        this.#data_ini = data_ini;
        this.#data_fim = data_fim;
        this.#valor_tot = valor_tot;
        this.#h_ativo = h_ativo; 
        this.#reserva = reserva;
    }
    
    get id_hospedagem() {
        return this.#id_hospedagem;
    }

    set id_hospedagem(novoid_hospedagem) {
        this.#id_hospedagem = novoid_hospedagem;
    }

    get data_ini() {
        return this.#data_ini;
    }

    set data_ini(novadata_ini) {
        this.#data_ini = novadata_ini
    }

    get data_fim() {
        return this.#data_fim;
    }

    set data_fim(novadata_fim) {
        this.#data_fim = novadata_fim
    }

    get valor_tot() {
        return this.#valor_tot;
    }

    set valor_tot(novovalor_tot) {
        this.#valor_tot = novovalor_tot;
    }

    get h_ativo() {
        return this.#h_ativo;
    }

    set h_ativo(novoativo) {
        this.#h_ativo = novoativo;
    }

    get reserva() {
        return this.#reserva;
    }

    set reserva(novareserva) {
        this.#reserva = novareserva;
    }

    toJSON() {
        return {
            "id_hospedagem" : this.#id_hospedagem,
            "data_ini" : this.#data_ini,
            "data_fim" : this.#data_fim,
            "valor_tot" : this.#valor_tot,
            "h_ativo" : this.#h_ativo,
            "reserva": this.#reserva
        }
    }

    async gravar() {
        const hospedagemBD = new HospedagemBD();
        this.id_hospedagem = await hospedagemBD.incluir(this);
    }

    async atualizar() {
        const hospedagemBD = new HospedagemBD();
        await hospedagemBD.alterar(this);
    }

    async removerBanco() {
        const hospedagemBD = new HospedagemBD();
        await hospedagemBD.excluir(this);
    }

    async consultar() {
        const hospedagemBD = new HospedagemBD();
        const hospedagens = await hospedagemBD.consultar();
        return hospedagens;
    }

    async consultarID(id) {
        const hospedagemBD = new HospedagemBD();
        const hospedagens = await hospedagemBD.consultarID(id);
        return hospedagens;
    }

    async consultarPeriodo(periodo) {
        const hospedagemBD = new HospedagemBD();
        const hospedagens = await hospedagemBD.consultarPeriodo(periodo);
        return hospedagens;
    }

    async consultarStatus(h_ativo) {
        const hospedagemBD = new HospedagemBD();
        const hospedagens = await hospedagemBD.consultarStatus(h_ativo);
        return hospedagens;
    }
}