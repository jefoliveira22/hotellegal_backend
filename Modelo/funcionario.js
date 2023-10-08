import FuncionarioBD from "../Persistencia/funcionarioBD.js";

export default class Funcionario {
    
    #funcionario_id
    #usuario_id
    #cargo
    #salario
       
  
    constructor(funcionario_id, usuario_id, cargo, salario) {
        this.#funcionario_id = funcionario_id;
        this.#usuario_id = usuario_id;
        this.#cargo = cargo;
        this.#salario = salario;  
    }
    
    get funcionario_id() {
        return this.#funcionario_id;
    }

    set funcionario_id(novofuncionario_id) {
        this.#funcionario_id = novofuncionario_id;
    }

    get usuario_id() {
        return this.#usuario_id;
    }

    set usuario_id(novousuario_id) {
        this.#usuario_id = novousuario_id;
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(novocargo) {
        this.#cargo = novocargo;
    }

    get salario() {
        return this.#salario;
    }

    set salario(novosalario) {
        this.#salario = novosalario;
    }


    toJSON() {
        return {
            "funcionario_id" : this.#funcionario_id,
            "usuario_id" : this.#usuario_id,
            "cargo" :   this.#cargo,  
            "salario" : this.#salario 
        }
    }

    async gravar() {
        const funcionarioBD = new FuncionarioBD();
        this.funcionario_id = await funcionarioBD.incluir(this);
    }

    async atualizar() {
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.alterar(this);
    }

    async baixar() {
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.baixaFuncionario(this);
    }

    async removerBanco() {
        const funcionarioBD = new FuncionarioBD();
        await funcionarioBD.excluir(this);
    }

    async consultar() {
        const funcionarioBD = new FuncionarioBD();
        const funcionarios = await funcionarioBD.consultar();
        return funcionarios;
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