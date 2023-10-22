import FuncionarioBD from "../Persistencia/funcionarioBD.js";
import ClienteBD from "../Persistencia/clienteBD.js";

export default class Cliente {

    #cliente_id
    #cpf
    #datanasc
    #nacionalidade
    #profissao
    #sexo
    #senha
    #Usuario


    constructor(cliente_id, cpf, datanasc, nacionalidade, profissao, sexo, senha, Usuario) {
        this.#cliente_id = cliente_id;
        this.#cpf = cpf;
        this.#datanasc = datanasc;
        this.#nacionalidade = nacionalidade;
        this.#profissao = profissao;
        this.#sexo = sexo;
        this.#senha = senha;
        this.#Usuario = Usuario;
    }

    get cliente_id() {
        return this.#cliente_id;
    }

    set cliente_id(novocliente_id) {
        this.#cliente_id = novocliente_id;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novocpf) {
        this.#cpf = novocpf;
    }

    get datanasc() {
        return this.#datanasc;
    }

    set datanasc(novodatanasc) {
        this.#datanasc = novodatanasc;
    }

    get nacionalidade() {
        return this.#nacionalidade;
    }

    set nacionalidade(novonacionalidade) {
        this.#nacionalidade = novonacionalidade;
    }
    
    get profissao() {
        return this.#profissao;
    }

    set profissao(novoprofissao) {
        this.#profissao = novoprofissao;
    }

    get sexo() {
        return this.#sexo;
    }

    set sexo(novosexo) {
        this.#sexo = novosexo;
    }

    get senha() {
        return this.#senha;
    }

    set senha(novosenha) {
        this.#senha = novosenha;
    }

    get usuario() {
        return this.#Usuario;
    }

    set usuario(novousuario) {
        this.#Usuario = novousuario;
    }

    toJSON() {
        return {
            "cliente_id": this.#cliente_id,
            "cpf": this.#cpf,
            "datanasc": this.#datanasc,
            "nacionalidade": this.#nacionalidade,
            "profissao": this.#profissao,
            "sexo": this.#sexo,
            "senha": this.#senha,
            "usuario": this.#Usuario
        }
    }

    async gravar() {
        const clienteBD = new ClienteBD();
        this.#cliente_id = await clienteBD.incluir(this);
    }

    async atualizar() {
        const clienteBD = new ClienteBD();
        await clienteBD.alterar(this);
    }

    async consultar() {
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultar();
        return clientes;
    }

    async consultarNome(nome) {
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultarNome(nome);
        return clientes;
    }
}