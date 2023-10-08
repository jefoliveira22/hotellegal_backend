import UsuarioBD from "../Persistencia/usuarioBD.js";

export default class Camareiro {

    #usuario_id
    #nome
    #email
    #senha
    #tipo_usuario
  
    constructor(usu_id, usu_nome, usu_email, usu_senha, usu_tipo) {
        this.#usuario_id = usu_id;
        this.#nome = usu_nome;
        this.#email = usu_email;
        this.#senha = usu_senha;
        this.#tipo_usuario = usu_tipo;
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
        await usuarioBD.incluir(this);
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