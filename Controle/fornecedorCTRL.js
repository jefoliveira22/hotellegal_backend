import Fornecedor from '../Modelo/fornecedor.js';
import Usuario from '../Modelo/usuario.js';


export default class FornecedorCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedor_id = dados.fornecedor_id;
            const nome_empresa = dados.nome_empresa;
            const cnpj = dados.cnpj;
            let usuario = dados.usuario;
            if (fornecedor_id, nome_empresa, cnpj, usuario) {
                const usuariopadrao = new Usuario(0, usuario.nome, usuario.email, usuario.senha, usuario.tipo_usuario);
                usuariopadrao.gravar().then(() => {
                    usuario["usuario_id"] = usuariopadrao.usuario_id
                    const fornecedor = new Fornecedor(0, nome_empresa, cnpj, usuario);
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

    // atualizar(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === "PUT" && requisicao.is('application/json')) {
    //         const dados = requisicao.body;
    //         const id_reserva = dados.id_reserva;
    //         const cpf_hosp = dados.cpf_hosp;
    //         const checkin = dados.checkin;
    //         const checkout = dados.checkout;
    //         const qte_pessoa_mais = dados.qte_pessoa_mais;
    //         const qte_pessoa_menos = dados.qte_pessoa_menos;
    //         const acomodacao = dados.acomodacao;
    //         const canc_free = dados.canc_free;
    //         const ativo = dados.ativo;
    //         if (id_reserva, cpf_hosp, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo) {
    //             const reserva = new Reserva(id_reserva, cpf_hosp, checkin, checkout, qte_pessoa_mais, qte_pessoa_menos, acomodacao, canc_free, ativo);
    //             reserva.atualizar().then(() => {
    //                 resposta.status(200).json({
    //                     status:true,
    //                     mensagem:'Reserva atualizada com sucesso!'
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
    //                 mensagem:'Informe adequadamente todos os dados de uma reserva conforme documentação da API.'
    //             })
    //         }
    //     }
    //     else {
    //         resposta.status(400).json({
    //             status:false,
    //             mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
    //         });
    //     }
    // }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const fornecedor_id = dados.fornecedor_id;
            if (fornecedor_id) {
                const fornecedor = new Fornecedor(fornecedor_id);
                fornecedor.removerBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Fornecedor removido com sucesso!'
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
                    mensagem: 'Informe id do Fornecedor conforme documentação da API.'
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