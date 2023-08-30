import UserBD from "../Persistencia/userBD.js";

export default class User {

    #usuario
    #senha
    #tipo
    
    constructor(usuario, senha, tipo) {
        this.#usuario = usuario;
        this.#senha = senha;
        this.#tipo = tipo;
    }
    
    get usuario() {
        return this.#usuario;
    }

    set usuario(pusuario) {
        this.#usuario = pusuario;
    }

    get senha() {
        return this.#senha;
    }

    set senha(psenha) {
        this.#senha = psenha;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(ptipo) {
        this.#tipo = ptipo;
    }

    toJSON() {
        return {
            "usuario" : this.#usuario,
            "senha" : this.#senha,
            "tipo" : this.#tipo,
        }
    }

    async gravar() {
        const userBD = new UserBD();
        this.#usuario = await userBD.incluir(this);
    }

    async atualizar() {
        const userBD = new UserBD();
        await userBD.alterar(this);
    }

    async removerBanco() {
        const userBD = new UserBD();
        await userBD.excluir(this);
    }

    async consultar() {
        const userBD = new UserBD();
        const users = await userBD.consultar();
        return users;
    }

    async consultarNome(logincpf) {
        const userBD = new UserBD();
        const users = await userBD.consultarNome(logincpf);
        return users;
    }
}