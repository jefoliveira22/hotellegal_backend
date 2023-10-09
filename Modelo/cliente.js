import FuncionarioBD from "../Persistencia/funcionarioBD.js";
import ClienteBD from "../Persistencia/clienteBD.js";

export default class Cliente {

    #cliente_id
    #endereco
    #telefone
    #Usuario
       
  
    constructor(cliente_id, endereco, telefone, Usuario) {
        this.#cliente_id = cliente_id;
        this.#endereco = endereco;
        this.#telefone = telefone;  
        this.#Usuario = Usuario;
    }
    
    get cliente_id() {
        return this.#cliente_id;
    }

    set cliente_id(novocliente_id) {
        this.#cliente_id = novocliente_id;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoendereco) {
        this.#endereco = novoendereco;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novotelefone) {
        this.#telefone = novotelefone;
    }
     
    get usuario() {
        return this.#Usuario;
    }

    set usuario(novousuario) {
        this.#Usuario = novousuario;
    }

    toJSON() {
        return {
            "cliente_id" : this.#cliente_id,
            "endereco" :   this.#endereco,  
            "telefone" : this.#telefone,
            "usuario" : this.#Usuario,
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

    async baixar() {
        const clienteBD = new ClienteBD();
        await clienteBD.baixaCliente(this);
    }

    async removerBanco() {
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
    }

    async consultar() {
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultar();
        return clientes;
    }

    // async consultarUltimoID() {
    //     const reservaBD = new ReservaBD();
    //     const reservas = await reservaBD.consultarUltimoID();
    //     return reservas;
    // }

    // async consultarID(id) {
    //     const reservaBD = new ReservaBD();
    //     const reservas = await reservaBD.consultarID(id);
    //     return reservas;
    // }
}