import Quarto from '../Modelo/quarto.js';


export default class QuartoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const numquarto = dados.numquarto;
            const nomequarto = dados.nomequarto;
            const descricao = dados.descricao;
            const ocupado = dados.ocupado;
            if (numquarto, nomequarto, descricao, ocupado) {
                const quarto = new Quarto(0, numquarto, nomequarto, descricao, ocupado);
                quarto.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:quarto.idquarto,
                        mensagem:'Quarto gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um quarto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou quarto no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idquarto = dados.idquarto;
            const numquarto = dados.numquarto;
            const nomequarto = dados.nomequarto;
            const descricao = dados.descricao;
            const ocupado = dados.ocupado;
            if (idquarto, numquarto, nomequarto, descricao, ocupado) {
                const quarto = new Quarto(idquarto, numquarto, nomequarto, descricao, ocupado);
                quarto.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Quarto atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um quarto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou quarto no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const idquarto = dados.idquarto;
            if (idquarto) {
                const quarto = new Quarto(idquarto);
                quarto.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Quarto removido com sucesso!'
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
                    mensagem:'Informe id do quarto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou quarto no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const quarto = new Quarto();
            quarto.consultar('').then((quartos) => {
                resposta.status(200).json(quartos);
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
                mensagem:'Método não permitido ou quarto no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nomequarto = requisicao.params['nomequarto'];
        if (requisicao.method === "GET") {
            const quarto = new Quarto();
            quarto.consultarNome(nomequarto).then((quartos) => {
                resposta.status(200).json(quartos);
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
                mensagem:'Método não permitido ou quarto no formato JSON não fornecido.'
            });
        }
    }
}