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

    // baixarumaReserva(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === "PUT" && requisicao.is('application/json')) {
    //         const dados = requisicao.body;
    //         const id_reserva = dados.id_reserva;
    //         const ativo = dados.ativo;
    //         if (id_reserva, ativo) {
    //             const reserva = new Reserva(id_reserva, ativo);
    //             reserva.baixar().then(() => {
    //                 resposta.status(200).json({
    //                     status:true,
    //                     mensagem:'Check-in concluído'
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
            const cliente_id = dados.cliente_id;
            if (cliente_id) {
                const cliente = new Cliente(cliente_id);
                cliente.removerBanco().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Cliente removido com sucesso!'
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
                    mensagem: 'Informe id do cliente conforme documentação da API.'
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

    // consultarPeloUltimoID(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === "GET") {
    //         const reserva = new Reserva();
    //         reserva.consultarUltimoID('').then((reservas) => {
    //             resposta.status(200).json(reservas);
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
    //             mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
    //         });
    //     }
    // }

    // consultarPeloID(requisicao, resposta) {
    //     resposta.type('application/json');
    //     const id_reserva = requisicao.params['id_reserva'];
    //     if (requisicao.method === "GET") {
    //         const reserva = new Reserva();
    //         reserva.consultarID(id_reserva).then((reservas) => {
    //             resposta.status(200).json(reservas);
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
    //             mensagem:'Método não permitido ou reserva no formato JSON não fornecido.'
    //         });
    //     }
    // }
}