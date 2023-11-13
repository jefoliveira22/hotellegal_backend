import ReservaBD from "../Persistencia/reservaBD.js";

export default class Reserva {

    #id_reserva
    #checkin
    #checkout
    #qte_pessoa_mais
    #qte_pessoa_menos
    #acomodacao
    #canc_free
    #ativo
    #hospede
    
  
    constructor(id_reserva, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo, hospede) {
        this.#id_reserva = id_reserva;
        this.#checkin = checkin;
        this.#checkout = checkout;
        this.#qte_pessoa_mais = qte_pessoa_mais;
        this.#qte_pessoa_menos = qte_pessoa_menos;
        this.#acomodacao = acomodacao;
        this.#canc_free = canc_free;
        this.#ativo = ativo;
        this.#hospede = hospede;
    }
    
    get id_reserva() {
        return this.#id_reserva;
    }

    set id_reserva(novoid_reserva) {
        this.#id_reserva = novoid_reserva;
    }

    get checkin() {
        return this.#checkin;
    }

    set checkin(novocheckin) {
        this.#checkin = novocheckin;
    }

    get checkout() {
        return this.#checkout;
    }

    set checkout(novocheckout) {
        this.#checkout = novocheckout;
    }

    get qte_pessoa_mais() {
        return this.#qte_pessoa_mais;
    }

    set qte_pessoa_mais(novoqte_pessoa_mais) {
        this.#qte_pessoa_mais = novoqte_pessoa_mais;
    }    

    get qte_pessoa_menos() {
        return this.#qte_pessoa_menos;
    }

    set qte_pessoa_menos(novoqte_pessoa_menos) {
        this.#qte_pessoa_menos = novoqte_pessoa_menos;
    }    

    get acomodacao() {
        return this.#acomodacao;
    }

    set acomodacao(novaacomodacao) {
        this.#acomodacao = novaacomodacao;
    }

    get canc_free() {
        return this.#canc_free;
    }

    set canc_free(novocanc_free) {
        this.#canc_free = novocanc_free;
    }

    get ativo() {
        return this.#ativo;
    }

    set ativo(novoativo) {
        this.#ativo = novoativo;
    }

    get hospede() {
        return this.#hospede;
    }

    set hospede(phospede) {
        this.#hospede = phospede;
    }

    toJSON() {
        return {
            "id_reserva" : this.#id_reserva,
            "checkin" : this.#checkin,
            "checkout" : this.#checkout,
            "qte_pessoa_mais" : this.#qte_pessoa_mais,
            "qte_pessoa_menos" : this.#qte_pessoa_menos, 
            "acomodacao" : this.#acomodacao,
            "canc_free" : this.#canc_free,
            "ativo" : this.#ativo,
            "hospede" : this.#hospede
        }
    }

    async gravar() {
        const reservaBD = new ReservaBD();
        this.id_reserva = await reservaBD.incluir(this);
    }

    async atualizar() {
        const reservaBD = new ReservaBD();
        await reservaBD.alterar(this);
    }

    async baixar() {
        const reservaBD = new ReservaBD();
        await reservaBD.baixaReserva(this);
    }

    async removerBanco() {
        const reservaBD = new ReservaBD();
        await reservaBD.excluir(this);
    }

    async consultar() {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultar();
        return reservas;
    }

    async consultarUltimoID() {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultarUltimoID();
        return reservas;
    }

    async consultarID(id) {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultarID(id);
        return reservas;
    }

    async consultarPeriodo(checkin) {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultarPeriodo(checkin);
        return reservas;
    }

    async consultarHospede(cpf_hosp) {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultarHospede(cpf_hosp);
        return reservas;
    }

    async consultarStatus(ativo) {
        const reservaBD = new ReservaBD();
        const reservas = await reservaBD.consultarStatus(ativo);
        return reservas;
    }
}