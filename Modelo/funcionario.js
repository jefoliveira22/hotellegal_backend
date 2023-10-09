import FuncionarioBD from "../Persistencia/funcionarioBD.js";
import UsuarioBD from "../Persistencia/usuarioBD.js";

export default class Funcionario {

    #funcionario_id
    #cargo
    #salario
    #Usuario
       
  
    constructor(funcionario_id, cargo, salario, Usuario) {
        this.#funcionario_id = funcionario_id;
        this.#cargo = cargo;
        this.#salario = salario;  
        this.#Usuario = Usuario;
    }
    
    get funcionario_id() {
        return this.#funcionario_id;
    }

    set funcionario_id(novofuncionario_id) {
        this.#funcionario_id = novofuncionario_id;
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
     
    get usuario() {
        return this.#Usuario;
    }

    set usuario(novousuario) {
        this.#Usuario = novousuario;
    }

    toJSON() {
        return {
            "funcionario_id" : this.#funcionario_id,
            "cargo" :   this.#cargo,  
            "salario" : this.#salario,
            "usuario" : this.#Usuario,
        }
    }

    async gravar() {
        const funcionarioBD = new FuncionarioBD();
        this.#funcionario_id = await funcionarioBD.incluir(this);
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