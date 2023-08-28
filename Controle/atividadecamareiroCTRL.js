import Atividadecamareiro from '../Modelo/atividadecamareiro.js';


export default class AtividadecamareiroCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf_cam = dados.cpf_cam;
            const descricao = dados.descricao;
            const prioridade = dados.prioridade;
            const tempoMedioDuracaoMin = dados.tempoMedioDuracaoMin;
            if (cpf_cam, descricao, prioridade, tempoMedioDuracaoMin) {
                const atividadecamareiro = new Atividadecamareiro(0, cpf_cam, descricao, prioridade, tempoMedioDuracaoMin);
                atividadecamareiro.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:atividadecamareiro.id_atv,
                        mensagem:'Atividade gravada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de uma atvidade conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou atividade no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_atv = dados.id_atv;
            const cpf_cam = dados.cpf_cam;
            const descricao = dados.descricao;
            const prioridade = dados.prioridade;
            const tempoMedioDuracaoMin = dados.tempoMedioDuracaoMin;
            if (id_atv, cpf_cam, descricao, prioridade, tempoMedioDuracaoMin) {
                const atividadecamareiro = new Atividadecamareiro(id_atv, cpf_cam, descricao, prioridade, tempoMedioDuracaoMin);
                atividadecamareiro.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Atividade atualizada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de uma atividade conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou atividade no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_atv = dados.id_atv;
            if (id_atv) {
                const atividadecamareiro = new Atividadecamareiro(id_atv);
                atividadecamareiro.removerBanco(atividadecamareiro).then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Atividade excluída com sucesso!'
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
                    mensagem:'Informe id da atividade conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou atividade no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const atividadecamareiro = new Atividadecamareiro();
            atividadecamareiro.consultar('').then((atividadecamareiros) => {
                resposta.status(200).json(atividadecamareiros);
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
                mensagem:'Método não permitido ou atividade no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloCPF(requisicao, resposta) {
        resposta.type('application/json');
        const id_atv = requisicao.params['cpf_cam'];
        if (requisicao.method === "GET") {
            const atividadecamareiro = new Atividadecamareiro();
            atividadecamareiro.consultarCPF(id_atv).then((atividadecamareiros) => {
                resposta.status(200).json(atividadecamareiros);
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
                mensagem:'Método não permitido ou atividade no formato JSON não fornecido.'
            });
        }
    }
}