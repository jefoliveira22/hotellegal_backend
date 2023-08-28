import ProdutoBD from "../Persistencia/produtoBD.js";

export default class Produto {

    #id_prod
    #nome_prod
    #descricao
    #preco
    
  
    constructor(id_prod, nome_prod, descricao, preco) {
        this.#id_prod = id_prod;
        this.#nome_prod = nome_prod;
        this.#descricao = descricao;
        this.#preco = preco;
    }
    
    get id_prod() {
        return this.#id_prod;
    }

    set id_prod(pid_prod) {
        this.#id_prod = pid_prod;
    }

    get nome_prod() {
        return this.#nome_prod;
    }

    set nome_prod(pnome_prod) {
        this.#nome_prod = pnome_prod;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(pdescricao) {
        this.#descricao = pdescricao;
    }

    get preco() {
        return this.#preco;
    }

    set preco(ppreco) {
        this.#preco = ppreco;
    } 

    toJSON() {
        return {
            "id_prod" : this.#id_prod,
            "nome_prod" : this.#nome_prod,
            "descricao" : this.#descricao,
            "preco" : this.#preco,
        }
    }

    async gravar() {
        const produtoBD = new ProdutoBD();
        this.#id_prod = await produtoBD.incluir(this);
    }

    async atualizar() {
        const produtoBD = new ProdutoBD();
        await produtoBD.alterar(this);
    }

    async removerBanco() {
        const produtoBD = new ProdutoBD();
        await produtoBD.excluir(this);
    }

    async consultar() {
        const produtoBD = new ProdutoBD();
        const produtos = await produtoBD.consultar();
        return produtos;
    }

    async consultarNome(nome) {
        const produtoBD = new ProdutoBD();
        const produtos = await produtoBD.consultarNome(nome);
        return produtos;
    }
}