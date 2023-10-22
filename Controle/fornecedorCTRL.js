import Fornecedor from '../Modelo/fornecedor.js';
import Usuario from '../Modelo/usuario.js';


export default class FornecedorCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedor_id = dados.fornecedor_id;
            const razao_social = dados.razao_social;
            const cnpj = dados.cnpj;
            const ie = dados.ie;
            const categoria = dados.categoria;
            let usuario = dados.usuario;
            if (fornecedor_id, razao_social, cnpj, ie, categoria, usuario) {
                const usuariopadrao = new Usuario(0, usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario);
                usuariopadrao.gravar().then(() => {
                    usuario["usuario_id"] = usuariopadrao.usuario_id
                    const fornecedor = new Fornecedor(0, razao_social, cnpj, ie, categoria, usuario);
                    fornecedor.gravar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            codigo: fornecedor.fornecedor_id,
                            mensagem: 'Fornecedor gravado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um Fornecedor conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedor_id = dados.fornecedor_id;
            const razao_social = dados.razao_social;
            const cnpj = dados.cnpj;
            const ie = dados.ie;
            const categoria = dados.categoria;
            let usuario = dados.usuario;
            if (fornecedor_id, razao_social, cnpj, ie, categoria, usuario) {
                const usuariopadrao = new Usuario(usuario.usuario_id, usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario);
                usuariopadrao.atualizar().then(() => {
                    const fornecedor = new Fornecedor(fornecedor_id, razao_social, cnpj, ie, categoria, usuario);
                    fornecedor.atualizar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: 'Fornecedor atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um fornecedor conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            fornecedor.consultar('').then((fornecedores) => {
                resposta.status(200).json(fornecedores);
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
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome'];
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            fornecedor.consultarNome(nome).then((nomes) => {
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
                mensagem: 'Método não permitido ou fornecedor no formato JSON não fornecido.'
            });
        }
    }
}