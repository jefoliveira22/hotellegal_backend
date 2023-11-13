import Reserva from '../Modelo/reserva.js';


export default class ReservaCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const checkin = dados.checkin;
            const checkout = dados.checkout;
            const qte_pessoa_mais = dados.qte_pessoa_mais;
            const qte_pessoa_menos = dados.qte_pessoa_menos;
            const acomodacao = dados.acomodacao;
            const canc_free = dados.canc_free;
            const ativo = dados.ativo;
            const hospede = dados.hospede;
            if (checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo, hospede) {
                const reserva = new Reserva(0, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo, hospede);
                reserva.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:reserva.id_reserva,
                        mensagem:'Reserva gravada com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status:false,
                    mensagem:'Informe adequadamente todos os dados de uma reserva conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_reserva = dados.id_reserva;
            const cpf_hosp = dados.cpf_hosp;
            const checkin = dados.checkin;
            const checkout = dados.checkout;
            const qte_pessoa_mais = dados.qte_pessoa_mais;
            const qte_pessoa_menos = dados.qte_pessoa_menos;
            const acomodacao = dados.acomodacao;
            const canc_free = dados.canc_free;
            const ativo = dados.ativo;
            if (id_reserva, cpf_hosp, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo) {
                const reserva = new Reserva(id_reserva, cpf_hosp, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo);
                reserva.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Reserva atualizada com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status:false,
                    mensagem:'Informe adequadamente todos os dados de uma reserva conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    baixarumaReserva(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_reserva = dados.id_reserva;
            const ativo = dados.ativo;
            if (id_reserva, ativo) {
                const reserva = new Reserva(id_reserva, ativo);
                reserva.baixar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Check-in concluído'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status:false,
                    mensagem:'Informe adequadamente todos os dados de uma reserva conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_reserva = dados.id_reserva;
            if (id_reserva) {
                const reserva = new Reserva(id_reserva);
                reserva.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Reserva removida com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status:false,
                    mensagem:'Informe id da reserva conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultar('').then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloUltimoID(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultarUltimoID('').then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const id_reserva = requisicao.params['id_reserva'];
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultarID(id_reserva).then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloPeriodo(requisicao, resposta) {
        resposta.type('application/json');
        const checkin = requisicao.params['checkin'];
        console.log('Checkin recebido:', checkin);
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultarPeriodo(checkin).then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }
    

    consultarPeloHospede(requisicao, resposta) {
        resposta.type('application/json');
        const cpf_hosp = requisicao.params['cpf_hosp'];
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultarPeloHospede(cpf_hosp).then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloStatus(requisicao, resposta) {
        resposta.type('application/json');
        const ativo = requisicao.params['ativo'];
        if (requisicao.method === "GET") {
            const reserva = new Reserva();
            reserva.consultarPeloStatus(ativo).then((reservas) => {
                resposta.status(200).json(reservas);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
            });
        }
    }
}