import AtividadecamareiroBD from "../Persistencia/atividadecamareiroBD.js";

export default class Atividadecamareiro {

    #id_atv
    #cpf_cam
    #descricao
    #prioridade
    #tempoMedioDuracaoMin
    
  
    constructor(id_atv, cpf_cam, descricao, prioridade, tempoMedioDuracaoMin) {
        this.#id_atv = id_atv;
        this.#cpf_cam = cpf_cam;
        this.#descricao = descricao;
        this.#prioridade = prioridade;
        this.#tempoMedioDuracaoMin = tempoMedioDuracaoMin;
    }
    
    get id_atv() {
        return this.#id_atv;
    }

    set id_atv(novoid_atv) {
        this.#id_atv = novoid_atv;
    }

    get cpf_cam() {
        return this.#cpf_cam;
    }

    set cpf_cam(novo_cpf_cam) {
        this.#id_atv = novo_cpf_cam;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novadescricao) {
        this.#descricao = novadescricao;
    }

    get prioridade() {
        return this.#prioridade;
    }

    set prioridade(novaprioridade) {
        this.#prioridade = novaprioridade;
    }

    get tempoMedioDuracaoMin() {
        return this.#tempoMedioDuracaoMin;
    }

    set tempoMedioDuracaoMin(novatempoMedioDuracaoMin) {
        this.#tempoMedioDuracaoMin = novatempoMedioDuracaoMin;
    }

    toJSON() {
        return {
            "id_atv" : this.#id_atv,
            "cpf_cam" : this.#cpf_cam,
            "descricao" : this.#descricao,
            "prioridade" : this.#prioridade,
            "tempoMedioDuracaoMin" : this.#tempoMedioDuracaoMin,
        }
    }

    async gravar() {
        const atividadecamareiroBD = new AtividadecamareiroBD();
        this.#id_atv = await atividadecamareiroBD.incluir(this);
    }

    async atualizar() {
        const atividadecamareiroBD = new AtividadecamareiroBD();
        await atividadecamareiroBD.alterar(this);
    }

    async removerBanco() {
        const atividadecamareiroBD = new AtividadecamareiroBD();
        await atividadecamareiroBD.excluir(this);
    }

    async consultar() {
        const atividadecamareiroBD = new AtividadecamareiroBD();
        const atividadecamareiros = await atividadecamareiroBD.consultar();
        return atividadecamareiros;
    }

    async consultarCPF(cpf_cam) {
        const atividadecamareiroBD = new AtividadecamareiroBD();
        const atividadecamareiros = await atividadecamareiroBD.consultarCPF(cpf_cam);
        return atividadecamareiros;
    }
}