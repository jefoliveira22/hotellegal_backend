import ServicoBD from "../Persistencia/servicoBD.js";

export default class Servico {

    #id_servico
    #nome_serv
    #descricao_serv
    #valor
    
  
    constructor(id_servico, nome_serv, descricao_serv, valor) {
        this.#id_servico = id_servico;
        this.#nome_serv = nome_serv;
        this.#descricao_serv = descricao_serv;
        this.#valor = valor; 
    }
    
    get id_servico() {
        return this.#id_servico;
    }

    set id_servico(novoid_servico) {
        this.#id_servico = novoid_servico;
    }

    get nome_serv() {
        return this.#nome_serv;
    }

    set nome_serv(novonome_serv) {
        this.#nome_serv = novonome_serv;
    }

    get descricao_serv() {
        return this.#descricao_serv;
    }

    set descricao_serv(novaqte) {
        this.#descricao_serv = novaqte;
    }

    get valor() {
        return this.#valor;
    }

    set valor(novovalor) {
        this.#valor = novovalor;
    }    

    toJSON() {
        return {
            "id_servico" : this.#id_servico,
            "nome_serv" : this.#nome_serv,
            "descricao_serv" : this.#descricao_serv,
            "valor" : this.#valor
        }
    }

    async gravar() {
        const servicoBD = new ServicoBD();
        this.#id_servico = await servicoBD.incluir(this);
    }

    async atualizar() {
        const servicoBD = new ServicoBD();
        await servicoBD.alterar(this);
    }

    async removerBanco() {
        const servicoBD = new ServicoBD();
        await servicoBD.excluir(this);
    }

    async consultar() {
        const servicoBD = new ServicoBD();
        const servicos = await servicoBD.consultar();
        return servicos;
    }

    async consultarNome(nome) {
        const servicoBD = new ServicoBD();
        const servicos = await servicoBD.consultarNome(nome);
        return servicos;
    }
}