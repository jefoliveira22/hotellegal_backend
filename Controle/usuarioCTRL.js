import Usuario from '../Modelo/usuario.js';


export default class UsuarioCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const usuario_id = dados.usuario_id;
            const nome = dados.nome;
            const email = dados.email;
            const senha = dados.senha;
            const tipo_usuario = dados.tipo_usuario
            if (usuario_id, nome, email, senha, tipo_usuario) {
                const usuario = new Usuario(usuario_id, nome, email, senha, tipo_usuario);
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
            const senha = dados.senha;
            const tipo_usuario = dados.tipo_usuario
            if (usuario_id, nome, email, senha, tipo_usuario) {
                const usuario = new Usuario(usuario_id, nome, email, senha, tipo_usuario);
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

    // excluir(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
    //         const dados = requisicao.body;
    //         const cpf_cam = dados.cpf_cam;
    //         if (cpf_cam) {
    //             const camareiro = new Camareiro(cpf_cam);
    //             camareiro.removerBanco(camareiro).then(() => {
    //                 resposta.status(200).json({
    //                     status:true,
    //                     mensagem:'Camareiro excluído com sucesso!'
    //                 });
    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     status:false,
    //                     mensagem: erro.message
    //                 })
    //             });
    //         }
    //         else {
    //             resposta.status(400).json({
    //                 status:false,
    //                 mensagem:'Informe o cpf do camareiro conforme documentação da API.'
    //             })
    //         }
    //     }
    //     else {
    //         resposta.status(400).json({
    //             status:false,
    //             mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
    //         });
    //     }
    // }

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

    // consultarPeloCPF(requisicao, resposta) {
    //     resposta.type('application/json');
    //     const cpf_cam = requisicao.params['cpf_cam'];
    //     if (requisicao.method === "GET") {
    //         const camareiro = new Camareiro();
    //         camareiro.consultarCPF(cpf_cam).then((camareiros) => {
    //             resposta.status(200).json(camareiros);
    //         }).catch((erro) => {
    //             resposta.status(500).json({
    //                 status:false,
    //                 mensagem: erro.message
    //             })
    //         });
    //     }
    //     else {
    //         resposta.status(400).json({
    //             status:false,
    //             mensagem:'Método não permitido ou camareiro no formato JSON não fornecido.'
    //         });
    //     }
    // }
}