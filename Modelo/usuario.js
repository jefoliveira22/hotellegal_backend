import UsuarioBD from "../Persistencia/usuarioBD.js";

export default class Usuario {

    #usuario_id
    #nome
    #email
    #senha
    #tipo_usuario
  
    constructor(usuario_id, nome, email, senha, tipo_usuario) {
        this.#usuario_id = usuario_id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#tipo_usuario = tipo_usuario;
    }
    
    get usuario_id() {
        return this.#usuario_id;
    }

    set usuario_id(novo_usuId) {
        this.#usuario_id = novo_usuId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novo_usunome) {
        this.#nome = novo_usunome;
    }

    get email() {
        return this.#email;
    }

    set email(novo_usuemail) {
        this.#email = novo_usuemail;
    }

    get senha() {
        return this.#senha;
    }

    set senha(novo_ususenha) {
        this.#senha = novo_ususenha;
    }

    get tipo_usuario() {
        return this.#tipo_usuario;
    }

    set tipo_usuario(novo_usutipo) {
        this.#tipo_usuario = novo_usutipo;
    }

 

    toJSON() {
        return {
            "usuario_id": this.#usuario_id,
            "nome":  this.#nome,
            "email": this.#email,
            "senha": this.#senha,
            "tipo_usuario": this.#tipo_usuario
        }
    }

    async gravar() {
        const usuarioBD = new UsuarioBD();
        this.#usuario_id = await usuarioBD.incluir(this);
        return this.#usuario_id;
    }

    async atualizar() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.alterar(this);
    }

    async removerBanco() {
        const usuarioBD = new UsuarioBD();
        await usuarioBD.excluir(this);
    }

    async consultar() {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultar();
        return usuarios;
    }

    async consultarID(usuario_id) {
        const usuarioBD = new UsuarioBD();
        const usuarios = await usuarioBD.consultarID(usuario_id);
        return usuarios;
    }
}