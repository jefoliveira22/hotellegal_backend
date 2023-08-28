import HospedeBD from "../Persistencia/hospedeBD.js";

export default class Hospede {

    #cpf
    #nome
    #datanasc
    #email
    #telefone
    #endereco
    #cidade
    #estado
    #cep
    #profissao
    #nacionalidade
    #sexo
    
  
    constructor(cpf, nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#datanasc = datanasc;
        this.#email = email;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
        this.#profissao = profissao;
        this.#nacionalidade = nacionalidade;
        this.#sexo = sexo;
    }
    
    get cpf() {
        return this.#cpf;
    }

    set cpf(novocpf) {
        this.#cpf = novocpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novonome) {
        this.#nome = novonome;
    }

    get datanasc() {
        return this.#datanasc;
    }    

    set datanasc(novadatanasc) {
        this.#datanasc = novadatanasc;
    }

    get email() {
        return this.#email;
    }

    set email(novoemail) {
        this.#email = novoemail;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novotelefone) {
        this.#telefone = novotelefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoendereco) {
        this.#endereco = novoendereco;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novacidade) {
        this.#cidade = novacidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoestado) {
        this.#estado = novoestado;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novocep) {
        this.#cep = novocep
    }

    get profissao() {
        return this.#profissao;
    }

    set profissao(novaprofissao) {
        this.#profissao = novaprofissao;
    }

    get nacionalidade() {
        return this.#nacionalidade;
    }

    set nacionalidade(novanacionalidade) {
        this.#nacionalidade = novanacionalidade;
    }

    get sexo() {
        return this.#sexo;
    }

    set sexo(novosexo) {
        this.#sexo = novosexo;
    }

    toJSON() {
        return {
            "cpf" : this.#cpf,
            "nome" : this.#nome,
            "datanasc" : this.#datanasc,
            "email" : this.#email,
            "telefone" : this.#telefone,
            "endereco" : this.#endereco,
            "cidade" : this.#cidade,
            "estado" : this.#estado,
            "cep" : this.#cep,
            "profissao" : this.#profissao,
            "nacionalidade" : this.#nacionalidade,
            "sexo" : this.#sexo
        }
    }

    async gravar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.incluir(this);
    }

    async atualizar() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.alterar(this);
    }

    async removerBanco() {
        const hospedeBD = new HospedeBD();
        await hospedeBD.excluir(this);
    }

    async consultar() {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultar();
        return hospedes;
    }

    async consultarNome(nome) {
        const hospedeBD = new HospedeBD();
        const hospedes = await hospedeBD.consultarNome(nome);
        return hospedes;
    }
}