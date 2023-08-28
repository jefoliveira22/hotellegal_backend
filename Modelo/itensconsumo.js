import Itens_ConsumoBD from "../Persistencia/itensconsumoBD.js";

export default class Itens_Consumo {

    #id_prod
    #id_consumo
    #qte_prod
    #valor_prod
    #produto
    
  
    constructor(id_prod, id_consumo, qte_prod, valor_prod, produto) {
        this.#id_prod = id_prod;
        this.#id_consumo = id_consumo;
        this.#qte_prod = qte_prod;
        this.#valor_prod = valor_prod;
        this.#produto = produto;
    }
    
    get id_prod() {
        return this.#id_prod;
    }

    set id_prod(pid_prod) {
        this.#id_prod = pid_prod;
    }

    get id_consumo() {
        return this.#id_consumo;
    }

    set id_consumo(pid_consumo) {
        this.#id_consumo = pid_consumo;
    }

    get qte_prod() {
        return this.#qte_prod;
    }

    set qte_prod(pqte_prod) {
        this.#qte_prod = pqte_prod;
    }

    get valor_prod() {
        return this.#valor_prod;
    }

    set valor_prod(pvalor_prod) {
        this.#valor_prod = pvalor_prod;
    } 

    get produto() {
        return this.#produto;
    }

    set produto(pproduto) {
        this.#produto = pproduto;
    } 

    toJSON() {
        return {
            "id_prod" : this.#id_prod,
            "id_consumo" : this.#id_consumo,
            "qte_prod" : this.#qte_prod,
            "valor_prod" : this.#valor_prod,
            "produto" : this.#produto
        }
    }

    async gravar() {
        const itens_consumoBD = new Itens_ConsumoBD();
        await itens_consumoBD.incluir(this);
    }
    
    async consultar() {
        const itens_consumoBD = new Itens_ConsumoBD();
        const itens = await itens_consumoBD.consultar();
        return itens;
    }

    async consultarID(id) {
        const itens_consumoBD = new Itens_ConsumoBD();
        const itens = await itens_consumoBD.consultarID(id);
        return itens;
    }
}