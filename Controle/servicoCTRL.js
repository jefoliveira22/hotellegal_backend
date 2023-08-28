import Servico from '../Modelo/servico.js';


export default class ServicoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome_serv = dados.nome_serv;
            const descricao_serv = dados.descricao_serv;
            const valor = dados.valor;
            if (nome_serv, descricao_serv, valor) {
                const servico = new Servico(0, nome_serv, descricao_serv, valor);
                servico.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:servico.id_servico,
                        mensagem:'Serviço gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um serviço conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou serviço no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_servico = dados.id_servico;
            const nome_serv = dados.nome_serv;
            const descricao_serv = dados.descricao_serv;
            const valor = dados.valor;
            if (id_servico, nome_serv, descricao_serv, valor) {
                const servico = new Servico(id_servico, nome_serv, descricao_serv, valor);
                servico.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Serviço atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um serviço conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou serviço no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_servico = dados.id_servico;
            if (id_servico) {
                const servico = new Servico(id_servico);
                servico.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Serviço removido com sucesso!'
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
                    mensagem:'Informe id do serviço conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou serviço no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const servico = new Servico();
            servico.consultar('').then((servicos) => {
                resposta.status(200).json(servicos);
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
                mensagem:'Método não permitido ou serviço no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome_serv = requisicao.params['nome_serv'];
        if (requisicao.method === "GET") {
            const servico = new Servico();
            servico.consultarNome(nome_serv).then((servicos) => {
                resposta.status(200).json(servicos);
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
                mensagem:'Método não permitido ou serviço no formato JSON não fornecido.'
            });
        }
    }
}