import Camareiro from '../Modelo/camareiro.js';


export default class CamareiroCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf_cam = dados.cpf_cam;
            const nome_cam = dados.nome_cam;
            const data_nasc = dados.data_nasc;
            const endereco_cam = dados.endereco_cam;
            const bairro = dados.bairro;
            const cidade_cam = dados.cidade_cam;
            const uf_cam = dados.uf_cam;
            const nis = dados.nis;
            const genero = dados.genero;
            if (cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero) {
                const camareiro = new Camareiro(cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero);
                camareiro.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Camareiro gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um camareiro conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf_cam = dados.cpf_cam;
            const nome_cam = dados.nome_cam;
            const data_nasc = dados.data_nasc;
            const endereco_cam = dados.endereco_cam;
            const bairro = dados.bairro;
            const cidade_cam = dados.cidade_cam;
            const uf_cam = dados.uf_cam;
            const nis = dados.nis;
            const genero = dados.genero;
            if (cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero) {
                const camareiro = new Camareiro(cpf_cam, nome_cam, data_nasc, endereco_cam, bairro, cidade_cam, uf_cam, nis, genero);
                camareiro.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Camareiro atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um camareiro conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf_cam = dados.cpf_cam;
            if (cpf_cam) {
                const camareiro = new Camareiro(cpf_cam);
                camareiro.removerBanco(camareiro).then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Camareiro excluído com sucesso!'
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
                    mensagem:'Informe o cpf do camareiro conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const camareiro = new Camareiro();
            camareiro.consultar('').then((camareiros) => {
                resposta.status(200).json(camareiros);
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
                mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloCPF(requisicao, resposta) {
        resposta.type('application/json');
        const cpf_cam = requisicao.params['cpf_cam'];
        if (requisicao.method === "GET") {
            const camareiro = new Camareiro();
            camareiro.consultarCPF(cpf_cam).then((camareiros) => {
                resposta.status(200).json(camareiros);
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
                mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
            });
        }
    }
}