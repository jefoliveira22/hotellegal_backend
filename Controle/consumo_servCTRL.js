import Consumo_Serv from '../Modelo/consumo_serv.js';


export default class Consumo_ServCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const data_serv = dados.data_serv;
            const desconto_serv = dados.desconto_serv;
            const valor_serv = dados.valor_serv;
            const listaServicos = dados.listaServicos;
            const hospedagem = dados.hospedagem;
            if (data_serv, desconto_serv, valor_serv, listaServicos, hospedagem) {
                const consumo_serv = new Consumo_Serv(0, data_serv, desconto_serv, valor_serv, listaServicos, hospedagem);
                consumo_serv.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:consumo_serv.id_consumo_serv,
                        mensagem:'Consumo gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um consumo conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_consumo_serv = dados.id_consumo_serv;
            const id_hospedagem = dados.id_hospedagem;
            const data_serv = dados.data_serv;
            const desconto_serv = dados.desconto_serv;
            const valor_serv = dados.valor_serv;
            if (id_consumo_serv, id_hospedagem, data_serv, desconto_serv, valor_serv) {
                const consumo_serv = new Consumo_Serv(id_consumo_serv, id_hospedagem, data_serv, desconto_serv, valor_serv);
                consumo_serv.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Consumo atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um consumo conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_consumo_serv = dados.id_consumo_serv;
            if (id_consumo_serv) {
                const consumo_serv = new Consumo_Serv(id_consumo_serv);
                consumo_serv.removerBanco(consumo_serv).then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Consumo removido com sucesso!'
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
                    mensagem:'Informe id do consumo conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const consumo_serv = new Consumo_Serv();
            consumo_serv.consultar('').then((consumos_serv) => {
                resposta.status(200).json(consumos_serv);
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
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome'];
        if (requisicao.method === "GET") {
            const consumo_serv = new Consumo_Serv();
            consumo_serv.consultarNome(nome).then((consumos_serv) => {
                resposta.status(200).json(consumos_serv);
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
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params['id_hospedagem'];
        if (requisicao.method === "GET") {
            const consumo_serv = new Consumo_Serv();
            consumo_serv.consultarID(id).then((consumos_serv) => {
                resposta.status(200).json(consumos_serv);
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
                mensagem:'Método não permitido ou consumo no formato JSON não fornecido.'
            });
        }
    }
}