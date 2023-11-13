import DespesaBD from "../Persistencia/despesaBD.js";

export default class Despesa {

    #id_despesa
    #cod_tipo_despesa
    #nome_desp
    #nfe
    #fornecedor
    #data_comp
    #valortotal
    #obs
    #pago
    
  
    constructor(id_despesa, cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago) {
        this.#id_despesa = id_despesa;
        this.#cod_tipo_despesa = cod_tipo_despesa;
        this.#nome_desp = nome_desp;
        this.#nfe = nfe;
        this.#fornecedor = fornecedor; 
        this.#data_comp = data_comp;
        this.#valortotal = valortotal;
        this.#obs = obs;
        this.#pago = pago;
    }
    
    get id_despesa() {
        return this.#id_despesa;
    }

    set id_despesa(novoid_despesa) {
        this.#id_despesa = novoid_despesa;
    }

    get cod_tipo_despesa() {
        return this.#cod_tipo_despesa;
    }

    set cod_tipo_despesa(novocod_tipo_despesa) {
        this.#cod_tipo_despesa = novocod_tipo_despesa;
    }

    get nome_desp() {
        return this.#nome_desp;
    }

    set nome_desp(novonome_desp) {
        this.#nome_desp = novonome_desp;
    }

    get nfe() {
        return this.#nfe;
    }

    set nfe(novanfe) {
        this.#nfe = novanfe;
    }

    get fornecedor() {
        return this.#fornecedor;
    }

    set fornecedor(novoforcecedor) {
        this.#fornecedor = novoforcecedor;
    }   
    
    get data_comp() {
        return this.#data_comp;
    }

    set data_comp(novadata_comp) {
        this.#data_comp = novadata_comp;
    }

    get valortotal() {
        return this.#valortotal;
    }

    set valortotal(novovalortotal) {
        this.#valortotal = novovalortotal;
        
    }

    get obs() {
        return this.#obs;
    }

    set obs(novaobs) {
        this.#obs = novaobs;
    }

    get pago() {
        return this.#pago;
    }

    set pago(novopago) {
        this.#pago = novopago;
    }

    toJSON() {
        return {
            "id_despesa" : this.#id_despesa,
            "cod_tipo_despesa": this.#cod_tipo_despesa,
            "nome_desp" : this.#nome_desp,
            "nfe" : this.#nfe,
            "fornecedor" : this.#fornecedor,
            "data_comp" : this.#data_comp,
            "valortotal" : this.#valortotal,
            "obs" : this.#obs,
            "pago" : this.#pago 
        }
    }

    async gravar() {
        const despesaBD = new DespesaBD();
        this.#id_despesa = await despesaBD.incluir(this);
    }

    async atualizar() {
        const despesaBD = new DespesaBD();
        await despesaBD.alterar(this);
    }

    async removerBanco() {
        const despesaBD = new DespesaBD();
        await despesaBD.excluir(this);
    }

    async consultar() {
        const despesaBD = new DespesaBD();
        const despesas = await despesaBD.consultar();
        return despesas;
    }

    async consultarID(id_despesa) {
        const despesaBD = new DespesaBD();
        const despesas = await despesaBD.consultarID(id_despesa);
        return despesas;
    }

    async consultarID(data_comp) {
        const despesaBD = new DespesaBD();
        const despesas = await despesaBD.consultarPeriodo(data_comp);
        return despesas;
    }
}