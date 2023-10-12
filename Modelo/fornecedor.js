import FornecedorBD from "../Persistencia/fornecedorBD.js";
import UsuarioBD from "../Persistencia/usuarioBD.js";

export default class Fornecedor {

    #fornecedor_id
    #nome_empresa
    #cnpj
    #Usuario


    constructor(fornecedor_id, nome_empresa, cnpj, Usuario) {
        this.#fornecedor_id = fornecedor_id;
        this.#nome_empresa = nome_empresa;
        this.#cnpj = cnpj;
        this.#Usuario = Usuario;
    }

    get fornecedor_id() {
        return this.#fornecedor_id;
    }

    set fornecedor_id(novofornecedor_id) {
        this.#fornecedor_id = novofornecedor_id;
    }

    get nome_empresa() {
        return this.#nome_empresa;
    }

    set nome_empresa(novonome_empresa) {
        this.#nome_empresa = novonome_empresa;
    }
    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novocnpj) {
        this.#cnpj = novocnpj;
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
            "nome_empresa": this.#nome_empresa,
            "cnpj": this.#cnpj,
            "usuario": this.#Usuario,
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

    async removerBanco() {
        const fornecedorBD = new FornecedorBD();
        await fornecedorBD.excluir(this);
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