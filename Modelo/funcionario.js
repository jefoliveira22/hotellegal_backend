import FuncionarioBD from "../Persistencia/funcionarioBD.js";
import UsuarioBD from "../Persistencia/usuarioBD.js";

export default class Funcionario {

    #funcionario_id
    #sexo
    #datanasc
    #cargo
    #salario
    #nis
    #senha
    #Usuario
       
  
    constructor(funcionario_id, sexo, datanasc, cargo, salario, nis, senha, Usuario) {
        this.#funcionario_id = funcionario_id;
        this.#sexo = sexo,
        this.#datanasc = datanasc,
        this.#cargo = cargo;
        this.#salario = salario;
        this.#nis = nis;
        this.#senha = senha;
        this.#Usuario = Usuario;
    }
    
    get funcionario_id() {
        return this.#funcionario_id;
    }

    set funcionario_id(novofuncionario_id) {
        this.#funcionario_id = novofuncionario_id;
    }

    get sexo() {
        return this.#sexo;
    }

    set sexo(novosexo) {
        this.#sexo = novosexo;
    }

    get datanasc() {
        return this.#datanasc;
    }

    set datanasc(novodatanasc) {
        this.#datanasc = novodatanasc;
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

    get nis() {
        return this.#nis;
    }

    set nis(novonis) {
        this.#nis = novonis;
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
            "funcionario_id" : this.#funcionario_id,
            "sexo": this.#sexo,
            "datanasc": this.#datanasc,
            "cargo" :   this.#cargo,  
            "salario" : this.#salario,
            "nis": this.#nis,
            "senha": this.#senha,
            "usuario" : this.#Usuario
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

    async consultar() {
        const funcionarioBD = new FuncionarioBD();
        const funcionarios = await funcionarioBD.consultar();
        return funcionarios;
    }

    async consultarNome(nome) {
        const funcionarioBD = new FuncionarioBD();
        const funcionarios = await funcionarioBD.consultarNome(nome);
        return funcionarios;
    }
}