import Tipodespesa from '../Modelo/tipodespesa.js';


export default class TipodespesaCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_tipo_desp = dados.cod_tipo_desp;
            const descr = dados.descr;
            if (cod_tipo_desp, descr) {
                const tipodespesa = new Tipodespesa(cod_tipo_desp, descr);
                tipodespesa.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Tipo de despesa gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um tipo de despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou tipo de despesa no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_tipo_desp = dados.cod_tipo_desp
            const descr = dados.descr;
            if (cod_tipo_desp, descr) {
                const tipodespesa = new Tipodespesa(cod_tipo_desp, descr);
                tipodespesa.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Tipo de despesa atualizada com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um tipo de despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou tipo de despesa no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cod_tipo_desp = dados.cod_tipo_desp
            if (cod_tipo_desp) {
                const tipodespesa = new Tipodespesa(cod_tipo_desp);
                tipodespesa.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Tipo de despesa removida com sucesso!'
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
                    mensagem:'Informe id do tipo de despesa conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou tipo de despesa no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const tipodespesa = new Tipodespesa();
            tipodespesa.consultar('').then((tipodespesas) => {
                resposta.status(200).json(tipodespesas);
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
                mensagem:'Método não permitido ou tipo de despesa no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const cod_tipo_desp = requisicao.params['cod_tipo_desp'];
        if (requisicao.method === "GET") {
            const tipodespesa = new Tipodespesa();
            tipodespesa.consultarID(cod_tipo_desp).then((tipodespesas) => {
                resposta.status(200).json(tipodespesas);
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
                mensagem:'Método não permitido ou tipo de despesa no formato JSON não fornecido.'
            });
        }
    }
}