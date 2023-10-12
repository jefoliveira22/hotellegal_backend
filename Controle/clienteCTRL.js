import Cliente from '../Modelo/cliente.js';
import Usuario from '../Modelo/usuario.js';


export default class FuncionarioCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cliente_id = dados.cliente_id;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            let usuario = dados.usuario;
            if (cliente_id, endereco, telefone, usuario) {
                const usuariopadrao = new Usuario(0, usuario.nome, usuario.email, usuario.senha, usuario.tipo_usuario);
                usuariopadrao.gravar().then(() => {
                    usuario["usuario_id"] = usuariopadrao.usuario_id
                    const cliente = new Cliente(0, endereco, telefone, usuario);
                    cliente.gravar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            codigo: cliente.cliente_id,
                            mensagem: 'Cliente gravado com sucesso!'
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        })
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados do Cliente conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou Cliente no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cliente_id = dados.cliente_id;
            const endereco = dados.endereco;
            const telefone = dados.telefone;
            let usuario = dados.usuario;
            if (cliente_id, endereco, telefone, usuario) {
                const usuariopadrao = new Usuario(usuario.usuario_id, usuario.nome, usuario.email, usuario.senha, usuario.tipo_usuario);
                usuariopadrao.atualizar().then(() => {
                    const cliente = new Cliente(cliente_id, endereco, telefone, usuario);
                    cliente.atualizar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: 'Cliente atualizado com sucesso!'
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        })
                    });
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Informe adequadamente todos os dados de um cliente conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou cliente no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            cliente.consultar('').then((clientes) => {
                resposta.status(200).json(clientes);
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
                mensagem: 'Método não permitido ou cliente no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome'];
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            cliente.consultarNome(nome).then((nomes) => {
                resposta.status(200).json(nomes);
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
                mensagem: 'Método não permitido ou cliente no formato JSON não fornecido.'
            });
        }
    }
}