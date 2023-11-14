import Despesa from '../Modelo/despesa.js';


export default class DespesaCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_tipo_despesa = dados.cod_tipo_despesa;
            const nome_desp = dados.nome_desp;
            const nfe = dados.nfe;
            const fornecedor = dados.fornecedor;
            const data_comp = dados.data_comp;
            const valortotal = dados.valortotal;
            const obs = dados.obs;
            const pago = dados.pago;
            if (cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago) {
                const despesa = new Despesa(0, cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago);
                despesa.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        codigo:despesa.id_despesa,
                        mensagem:'Despesa gravada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados da despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_despesa = dados.id_despesa;
            const cod_tipo_despesa = dados.cod_tipo_despesa;
            const nome_desp = dados.nome_desp;
            const nfe = dados.nfe;
            const fornecedor = dados.fornecedor;
            const data_comp = dados.data_comp;
            const valortotal = dados.valortotal;
            const obs = dados.obs;
            const pago = dados.pago;
            if (id_despesa, cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago) {
                const despesa = new Despesa(id_despesa, cod_tipo_despesa, nome_desp, nfe, fornecedor, data_comp, valortotal, obs, pago);
                despesa.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Despesa atualizada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados da despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_despesa = dados.id_despesa;
            if (id_despesa) {
                const despesa = new Despesa(id_despesa);
                despesa.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Despesa removida com sucesso!'
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
                    mensagem:'Informe id da despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const despesa = new Despesa();
            despesa.consultar('').then((despesas) => {
                resposta.status(200).json(despesas);
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
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const id_despesa = requisicao.params['id_despesa'];
        if (requisicao.method === "GET") {
            const despesa = new Despesa();
            despesa.consultarID(id_despesa).then((despesas) => {
                resposta.status(200).json(despesas);
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
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloPeriodo(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const periodo = requisicao.body;
            const despesa = new Despesa();
            despesa.consultarPeriodo(periodo).then((despesas) => {
                resposta.status(200).json(despesas);
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
                mensagem:'Método não permitido ou despesa no formato JSON não fornecido.'
            });
        }
    }
}