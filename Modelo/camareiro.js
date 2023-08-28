import CamareiroBD from "../Persistencia/camareiroBD.js";

export default class Camareiro {

    #cpf_cam
    #nome_cam
    #data_nasc
    #endereco_cam
    #bairro
    #cidade_cam
    #uf_cam
    #nis
    #genero
    
  
    constructor(cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero) {
        this.#cpf_cam = cpf_cam;
        this.#nome_cam = nome_cam;
        this.#data_nasc = data_nasc;
        this.#endereco_cam = endereco_cam;
        this.#bairro = bairro;
        this.#cidade_cam = cidade_cam;
        this.#uf_cam = uf_cam;
        this.#nis = nis;
        this.#genero = genero;
    }
    
    get cpf_cam() {
        return this.#cpf_cam;
    }

    set cpf_cam(novocpf_cam) {
        this.#cpf_cam = novocpf_cam;
    }

    get nome_cam() {
        return this.#nome_cam;
    }

    set nome_cam(novonome_cam) {
        this.#nome_cam = novonome_cam;
    }

    get data_nasc() {
        return this.#data_nasc;
    }

    set data_nasc(novodata_nasc) {
        this.#data_nasc = novodata_nasc;
    }

    get endereco_cam() {
        return this.#endereco_cam;
    }

    set endereco_cam(novoendereco_cam) {
        this.#endereco_cam = novoendereco_cam;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novobairro) {
        this.#bairro = novobairro;
    }    

    get cidade_cam() {
        return this.#cidade_cam;
    }

    set cidade_cam(novacidade_cam) {
        this.#cidade_cam = novacidade_cam;
    }

    get uf_cam() {
        return this.#uf_cam;
    }

    set uf_cam(novouf_cam) {
        this.#uf_cam = novouf_cam;
    }

    get nis() {
        return this.#nis;
    }

    set nis(novonis) {
        this.#nis = novonis;
    }

    get genero() {
        return this.#genero;
    }

    set genero(novogenero) {
        this.#genero = novogenero;
    }

    toJSON() {
        return {
            "cpf_cam" : this.#cpf_cam,
            "nome_cam" : this.#nome_cam,
            "data_nasc" : this.#data_nasc,
            "endereco_cam" : this.#endereco_cam,
            "bairro" : this.#bairro, 
            "cidade_cam" : this.#cidade_cam,
            "uf_cam" : this.#uf_cam,
            "nis" : this.#nis,
            "genero" : this.#genero
        }
    }

    async gravar() {
        const camareiroBD = new CamareiroBD();
        await camareiroBD.incluir(this);
    }

    async atualizar() {
        const camareiroBD = new CamareiroBD();
        await camareiroBD.alterar(this);
    }

    async removerBanco() {
        const camareiroBD = new CamareiroBD();
        await camareiroBD.excluir(this);
    }

    async consultar() {
        const camareiroBD = new CamareiroBD();
        const camareiros = await camareiroBD.consultar();
        return camareiros;
    }

    async consultarCPF(cpf_cam) {
        const camareiroBD = new CamareiroBD();
        const camareiros = await camareiroBD.consultarCPF(cpf_cam);
        return camareiros;
    }
}