import FornecedorBD from "../Persistencia/fornecedorBD.js";

export default class Fornecedor {

    #fornecedor_id
    #razao_social
    #cnpj
    #ie
    #categoria
    #Usuario


    constructor(fornecedor_id, razao_social, cnpj, ie, categoria, Usuario) {
        this.#fornecedor_id = fornecedor_id;
        this.#razao_social = razao_social;
        this.#cnpj = cnpj;
        this.#ie = ie;
        this.#categoria = categoria;
        this.#Usuario = Usuario;
    }

    get fornecedor_id() {
        return this.#fornecedor_id;
    }

    set fornecedor_id(novofornecedor_id) {
        this.#fornecedor_id = novofornecedor_id;
    }

    get razao_social() {
        return this.#razao_social;
    }

    set razao_social(novorazao_social) {
        this.#razao_social = novorazao_social;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novocnpj) {
        this.#cnpj = novocnpj;
    }

    get ie() {
        return this.#ie;
    }

    set ie(novoie) {
        this.#ie = novoie;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novocategoria) {
        this.#categoria = novocategoria;
    }

    get usuario() {
        return this.#Usuario;
    }

    set usuario(novousuario) {
        this.#Usuario = novousuario;
    }

    toJSON() {
        return {
            "fornecedor_id": this.#fornecedor_id,
            "razao_social": this.#razao_social,
            "cnpj": this.#cnpj,
            "ie": this.#ie,
            "categoria": this.#categoria,
            "usuario": this.#Usuario
        }
    }

    async gravar() {
        const fornecedorBD = new FornecedorBD();
        this.#fornecedor_id = await fornecedorBD.incluir(this);
    }

    async atualizar() {
        const fornecedorBD = new FornecedorBD();
        await fornecedorBD.alterar(this);
    }

    async consultar() {
        const fornecedorBD = new FornecedorBD();
        const fornecedores = await fornecedorBD.consultar();
        return fornecedores;
    }

    async consultarNome(nome) {
        const fornecedorBD = new FornecedorBD();
        const fornecedores = await fornecedorBD.consultarID(nome);
        return fornecedores;
    }
}