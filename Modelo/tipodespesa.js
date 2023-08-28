import TipodespesaBD from "../Persistencia/tipodespesaBD.js";

export default class Tipodespesa {

    #cod_tipo_desp
    #descr
    
  
    constructor(cod_tipo_desp, descr) {
        this.#cod_tipo_desp = cod_tipo_desp;
        this.#descr = descr;
    }
    
    get descr() {
        return this.#descr;
    }

    set descr(novadescr) {
        this.#descr = novadescr;
    }

    get cod_tipo_desp() {
        return this.#cod_tipo_desp
    }

    set cod_tipo_desp(novocod_tipo_desp) {
        this.#cod_tipo_desp = novocod_tipo_desp;
    }


    toJSON() {
        return {
            "cod_tipo_desp" : this.#cod_tipo_desp,
            "descr" : this.#descr,
        }
    }

    async gravar() {
        const tipodespesaBD = new TipodespesaBD();
        await tipodespesaBD.incluir(this);
    }

    async atualizar() {
        const tipodespesaBD = new TipodespesaBD();
        await tipodespesaBD.alterar(this);
    }

    async removerBanco() {
        const tipodespesaBD = new TipodespesaBD();
        await tipodespesaBD.excluir(this);
    }

    async consultar() {
        const tipodespesaBD = new TipodespesaBD();
        const tipodespesas = await tipodespesaBD.consultar();
        return tipodespesas;
    }

    async consultarID(cod_tipo_desp) {
        const tipodespesaBD = new TipodespesaBD();
        const tipodespesas = await tipodespesaBD.consultarID(cod_tipo_desp);
        return tipodespesas;
    }
}