import User from '../Modelo/user.js';

export default class UserCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario = dados.usuario;
            const senha = dados.senha;
            const tipo = dados.tipo;
            if (usuario, senha, tipo) {
                const user = new User(0, usuario, senha, tipo);
                user.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:user.usuario,
                        mensagem:'Usuário gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados do usuário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou usuário no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario = dados.usuario;
            const senha = dados.senha;
            const tipo = dados.tipo;
            if (usuario, senha, tipo) {
                const user = new User(usuario, senha, tipo);
                user.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Usuário atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados do usuário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou usuário no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario = dados.usuario;
            if (usuario) {
                const user = new User(usuario);
                user.removerBanco(user).then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Usuário removido com sucesso!'
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
                    mensagem:'Informe o usuário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou usuário no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const user = new User();
            user.consultar('').then((users) => {
                resposta.status(200).json(users);
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
                mensagem:'Método não permitido ou usuário no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const logincpf = requisicao.params['logincpf'];
        if (requisicao.method === "GET") {
            const user = new User();
            user.consultarNome(logincpf).then((users) => {
                resposta.status(200).json(users);
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
                mensagem:'Método não permitido ou hospede no formato JSON não fornecido.'
            });
        }
    }
}