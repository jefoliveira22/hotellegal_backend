import Produto from '../Modelo/produto.js';


export default class ProdutoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome_prod = dados.nome_prod;
            const descricao = dados.descricao;
            const preco = dados.preco;
            if (nome_prod, descricao, preco) {
                const produto = new Produto(0, nome_prod, descricao, preco);
                produto.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:produto.id_prod,
                        mensagem:'Produto gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um produto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou produto no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_prod = dados.id_prod;
            const nome_prod = dados.nome_prod;
            const descricao = dados.descricao;
            const preco = dados.preco;
            if (id_prod, nome_prod, descricao, preco) {
                const produto = new Produto(id_prod, nome_prod, descricao, preco);
                produto.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Produto atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um produto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou produto no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_prod = dados.id_prod;
            if (id_prod) {
                const produto = new Produto(id_prod);
                produto.removerBanco(produto).then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Produto removido com sucesso!'
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
                    mensagem:'Informe id do produto conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou produto no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const produto = new Produto();
            produto.consultar('').then((produtos) => {
                resposta.status(200).json(produtos);
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
                mensagem:'Método não permitido ou produto no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome_prod'];
        if (requisicao.method === "GET") {
            const produto = new Produto();
            produto.consultarNome(nome).then((produtos) => {
                resposta.status(200).json(produtos);
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
                mensagem:'Método não permitido ou produto no formato JSON não fornecido.'
            });
        }
    }
}