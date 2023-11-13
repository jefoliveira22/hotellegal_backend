import Hospedagem from '../Modelo/hospedagem.js';


export default class HospedagemCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const data_ini = dados.data_ini;
            const data_fim = dados.data_fim;
            const valor_tot = dados.valor_tot;
            const h_ativo = dados.h_ativo;
            const reserva = dados.reserva;
            if (0, data_ini, data_fim, valor_tot, h_ativo, reserva) {
                const hospedagem = new Hospedagem(0, data_ini, data_fim, valor_tot, h_ativo, reserva);
                hospedagem.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:hospedagem.id_hospedagem,
                        mensagem:'Hospedagem gravada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de uma hospedagem conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_hospedagem = dados.id_hospedagem;
            const data_ini = dados.data_ini;
            const data_fim = dados.data_fim;
            const valor_tot = dados.valor_tot;
            const h_ativo = dados.h_ativo;
            const reserva = dados.reserva;
            if (id_hospedagem, data_ini, data_fim, valor_tot, h_ativo, reserva) {
                const hospedagem = new Hospedagem(id_hospedagem, data_ini, data_fim, valor_tot, h_ativo, reserva);
                hospedagem.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Hospedagem atualizada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de uma hospedagem conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_hospedagem = dados.id_hospedagem;
            if (id_hospedagem) {
                const hospedagem = new Hospedagem(id_hospedagem);
                hospedagem.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Hospedagem removida com sucesso!'
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
                    mensagem:'Informe id da hospedagem conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const hospedagem = new Hospedagem();
            hospedagem.consultar('').then((hospedagens) => {
                resposta.status(200).json(hospedagens);
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
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const id_hospedagem = requisicao.params['id_hospedagem'];
        if (requisicao.method === "GET") {
            const hospedagem = new Hospedagem();
            hospedagem.consultarID(id_hospedagem).then((hospedagens) => {
                resposta.status(200).json(hospedagens);
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
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloPeriodo(requisicao, resposta) {
        resposta.type('application/json');
        const data_ini = requisicao.params['data_ini'];
        if (requisicao.method === "GET") {
            const hospedagem = new Hospedagem();
            hospedagem.consultarPeriodo(data_ini).then((hospedagens) => {
                resposta.status(200).json(hospedagens);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }
    
    consultarPeloStatus(requisicao, resposta) {
        resposta.type('application/json');
        const h_ativo = requisicao.params['h_ativo'];
        if (requisicao.method === "GET") {
            const hospedagem = new Hospedagem();
            hospedagem.consultarPeloStatus(h_ativo).then((hospedagens) => {
                resposta.status(200).json(hospedagens);
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
                mensagem:'Método não permitido ou hospedagem no formato JSON não fornecido.'
            });
        }
    }
}