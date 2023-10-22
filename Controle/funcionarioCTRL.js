import Funcionario from '../Modelo/funcionario.js';
import Usuario from '../Modelo/usuario.js';


export default class FuncionarioCTRL {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const funcionario_id = dados.funcionario_id;
            const sexo = dados.sexo;
            const datanasc = dados.datanasc;
            const cargo = dados.cargo;
            const salario = dados.salario;
            const nis = dados.nis;
            const senha = dados.senha;
            let usuario = dados.usuario;
            if (funcionario_id, sexo, datanasc, cargo, salario, nis, senha, usuario) {
                const usuariopadrao = new Usuario(0, usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario);
                usuariopadrao.gravar().then(() => {
                    usuario["usuario_id"] = usuariopadrao.usuario_id
                    const funcionario = new Funcionario(0, sexo, datanasc, cargo, salario, nis, senha, usuario);
                    funcionario.gravar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            codigo: funcionario.funcionario_id,
                            mensagem: 'Funcionário gravado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um Funcionário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido.'
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const funcionario_id = dados.funcionario_id;
            const sexo = dados.sexo;
            const datanasc = dados.datanasc;
            const cargo = dados.cargo;
            const salario = dados.salario;
            const nis = dados.nis;
            const senha = dados.senha;
            let usuario = dados.usuario;
            if (funcionario_id, sexo, datanasc, cargo, salario, nis, senha, usuario) {
                const usuariopadrao = new Usuario(usuario.usuario_id, usuario.nome, usuario.email, usuario.endereco, usuario.telefone, usuario.cidade, usuario.estado, usuario.cep, usuario.tipo_usuario);
                usuariopadrao.atualizar().then(() => {
                    const funcionario = new Funcionario(funcionario_id, sexo, datanasc, cargo, salario, nis, senha, usuario);
                    funcionario.atualizar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: 'Funcionário atualizado com sucesso!'
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
                    mensagem: 'Informe adequadamente todos os dados de um Funcionário conforme documentação da API.'
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido.'
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const funcionario = new Funcionario();
            funcionario.consultar('').then((funcionarios) => {
                resposta.status(200).json(funcionarios);
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
                mensagem: 'Método não permitido ou funcionário no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloNome(requisicao, resposta) {
        resposta.type('application/json');
        const nome = requisicao.params['nome'];
        if (requisicao.method === "GET") {
            const funcionario = new Funcionario();
            funcionario.consultarNome(nome).then((nomes) => {
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
                mensagem: 'Método não permitido ou funcionario no formato JSON não fornecido.'
            });
        }
    }

    consultarPeloEmail(requisicao, resposta) {
        resposta.type('application/json');
        const email = requisicao.params['email'];
        if (requisicao.method === "GET") {
            const funcionario = new Funcionario();
            funcionario.consultarEmail(email).then((emails) => {
                resposta.status(200).json(emails);
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
                mensagem: 'Método não permitido ou funcionario no formato JSON não fornecido.'
            });
        }
    }
}