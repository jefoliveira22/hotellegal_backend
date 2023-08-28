import Consumo from '../Modelo/consumo.js';


export default class ConsumoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const data_cons = dados.data_cons;
            const desconto = dados.desconto;
            const valor = dados.valor;
            const listaProdutos = dados.listaProdutos;
            const hospedagem = dados.id_hospedagem;
            if (data_cons, desconto, valor, listaProdutos, hospedagem) {
                const consumo = new Consumo(0, data_cons, desconto, valor, listaProdutos, hospedagem);
                consumo.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:consumo.id_consumo,
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
            const id_consumo = dados.id_consumo;
            const id_hospedagem = dados.id_hospedagem;
            const data_cons = dados.data_cons;
            const desconto = dados.desconto;
            const valor = dados.valor;
            if (id_consumo, id_hospedagem, data_cons, desconto, valor) {
                const consumo = new Consumo(id_consumo, id_hospedagem, data_cons, desconto, valor);
                consumo.atualizar().then(() => {
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
            const id_consumo = dados.id_consumo;
            if (id_consumo) {
                const consumo = new Consumo(id_consumo);
                consumo.removerBanco(consumo).then(() => {
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
            const consumo = new Consumo();
            consumo.consultar('').then((consumos) => {
                resposta.status(200).json(consumos);
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
            const consumo = new Consumo();
            consumo.consultarNome(nome).then((consumos) => {
                resposta.status(200).json(consumos);
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
            const consumo = new Consumo();
            consumo.consultarID(id).then((consumos) => {
                resposta.status(200).json(consumos);
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