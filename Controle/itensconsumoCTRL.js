import Itens_Consumo from '../Modelo/itensconsumo.js';


export default class Itens_ConsumoCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id_prod = dados.id_prod;
            const id_consumo = dados.id_consumo;
            const qte_prod = dados.qte_prod;
            const valor_prod = dados.valor_prod;
            if (id_prod, id_consumo, qte_prod, valor_prod) {
                const itens_consumo = new Itens_Consumo(id_prod, id_consumo, qte_prod, valor_prod);
                itens_consumo.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Itens gravados com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um item conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou item no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const itens_consumo = new Itens_Consumo();
            itens_consumo.consultar('').then((itens_consumos) => {
                resposta.status(200).json(itens_consumos);
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
                mensagem:'Método não permitido ou item no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloID(requisicao, resposta) {
        resposta.type('application/json');
        const id = requisicao.params['id_consumo'];
        if (requisicao.method === "GET") {
            const itens_consumo = new Itens_Consumo();
            itens_consumo.consultarID(id).then((itens_consumos) => {
                resposta.status(200).json(itens_consumos);
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
                mensagem:'Método não permitido ou item no formato JSON não fornecido.'
            });
        }
    }
}