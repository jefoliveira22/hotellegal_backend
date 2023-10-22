import Usuario from '../Modelo/usuario.js';


export default class UsuarioCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario_id = dados.usuario_id;
            const nome = dados.nome;
            const email = dados.email;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const cep = dados.cep;
            const tipo_usuario = dados.tipo_usuario
            if (usuario_id, nome, email, endereco, telefone, cidade, estado, cep, tipo_usuario) {
                const usuario = new Usuario(0, nome, email, endereco, cidade, estado, cep, tipo_usuario);
                usuario.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Usuário gravado com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados do usuário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou Usuário no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario_id = dados.usuario_id;
            const nome = dados.nome;
            const email = dados.email;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const cep = dados.cep;
            const tipo_usuario = dados.tipo_usuario
            if (usuario_id, nome, email, endereco, telefone, cidade, estado, cep, tipo_usuario) {
                const usuario = new Usuario(usuario_id, nome, email, endereco, cidade, estado, cep, tipo_usuario);
                usuario.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Usuário gravado com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados do usuário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou Usuário no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario_id = dados.usuario_id;
            if (usuario_id) {
                const usuario = new Usuario(usuario_id);
                usuario.removerBanco(usuario_id).then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Usuario excluído com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe o nome do usuario conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou usuario no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const usuario = new Usuario();
            usuario.consultar('').then((usuarios) => {
                resposta.status(200).json(usuarios);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou Usuário não encontrado no forma JSON.'
            });
        }
    }
}