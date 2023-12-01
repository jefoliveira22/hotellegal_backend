import QuartoBD from "../Persistencia/quartoBD.js";

export default class Quarto {

    #idquarto
    #numquarto
    #nomequarto
    #descricao
    #ocupado
    
  
    constructor(idquarto, numquarto, nomequarto, descricao, ocupado) {
        this.#idquarto = idquarto;
        this.#numquarto = numquarto;
        this.#nomequarto = nomequarto;
        this.#descricao = descricao;
        this.#ocupado = ocupado; 
    }
    
    get idquarto() {
        return this.#idquarto;
    }

    set idquarto(pidquarto) {
        this.#idquarto = pidquarto;
    }

    get numquarto() {
        return this.#numquarto;
    }

    set numquarto(pnumquarto) {
        this.#numquarto = pnumquarto;
    }

    get nomequarto() {
        return this.#nomequarto;
    }

    set nomequarto(pnomequarto) {
        this.#nomequarto = pnomequarto;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(pdescricao) {
        this.#descricao = pdescricao;
    }

    get ocupado() {
        return this.#ocupado;
    }

    set ocupado(pocupado) {
        this.#ocupado = pocupado;
    }    

    toJSON() {
        return {
            idquarto: this.#idquarto,
            numquarto: this.#numquarto,
            nomequarto: this.#nomequarto,
            descricao: this.#descricao,
            ocupado: this.#ocupado
        }
    }

    async gravar() {
        const quartoBD = new QuartoBD();
        this.#idquarto = await quartoBD.incluir(this);
    }

    async atualizar() {
        const quartoBD = new QuartoBD();
        await quartoBD.alterar(this);
    }

    async atualizarOcupacao() {
        const quartoBD = new QuartoBD();
        await quartoBD.alterarOcupacao(this);
    }

    async removerBanco() {
        const quartoBD = new QuartoBD();
        await quartoBD.excluir(this);
    }

    async consultar() {
        const quartoBD = new QuartoBD();
        const quartos = await quartoBD.consultar();
        return quartos;
    }

    async consultarVazio() {
        const quartoBD = new QuartoBD();
        const quartos = await quartoBD.consultarVazio();
        return quartos;
    }

    async consultarNome(nome) {
        const quartoBD = new QuartoBD();
        const quartos = await quartoBD.consultarNome(nome);
        return quartos;
    }
}