import Hospede from '../Modelo/hospede.js';


export default class HospedeCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf
            const nome = dados.nome;
            const datanasc = dados.datanasc;
            const email = dados.email;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const cep = dados.cep;
            const profissao = dados.profissao;
            const nacionalidade = dados.nacionalidade;
            const sexo = dados.sexo;
            if (nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo) {
                const hospede = new Hospede(cpf, nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo);
                hospede.gravar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Hóspede gravado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados de um hóspede conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hóspede no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const datanasc = dados.datanasc;
            const email = dados.email;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const cep = dados.cep;
            const profissao = dados.profissao;
            const nacionalidade = dados.nacionalidade;
            const sexo = dados.sexo;
            if (cpf, nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo) {
                const hospede = new Hospede(cpf, nome, datanasc, email, telefone, endereco, cidade, estado, cep, profissao, nacionalidade, sexo);
                hospede.atualizar().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Hóspede atualizado com sucesso!'
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
                    mensagem:'Informe adequadamente todos os dados do hóspede conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hóspede no formato JSON não fornecido.'
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf) {
                const hospede = new Hospede(cpf);
                hospede.removerBanco().then(() => {
                    resposta.status(200).json({
                        status:true,
                        mensagem:'Hospede removido com sucesso!'
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
                    mensagem:'Informe o CPF hospede conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status:false,
                mensagem:'Método não permitido ou hospede no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const hospede = new Hospede();
            hospede.consultar('').then((hospedes) => {
                resposta.status(200).json(hospedes);
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

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome'];
        if (requisicao.method === "GET") {
            const hospede = new Hospede();
            hospede.consultarNome(nome).then((hospedes) => {
                resposta.status(200).json(hospedes);
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