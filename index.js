import express from 'express';
import rotaDespesa from './Rotas/rotaDespesa.js';
import rotaConsumo from './Rotas/rotaConsumo.js';
import rotaHospedagem from './Rotas/rotaHospedagem.js';
import rotaTipodespesa from './Rotas/rotatipodespesa.js';
import rotaHospede from './Rotas/rotaHospede.js';
import rotaReserva from './Rotas/rotaReserva.js';
import rotaServico from './Rotas/rotaServico.js';
import cors from 'cors';
import rotaCamareiro from './Rotas/rotaCamareiro.js';
import rotaAtividadecamareiro from './Rotas/rotaAtividadecamareiro.js';
import rotaQuarto from './Rotas/rotaQuarto.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaItensConsumo from './Rotas/rotaItensConsumo.js';
import rotaConsumoServ from './Rotas/rotaConsumoServ.js';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaUsuario from './Rotas/rotaUsuario.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';


const app = express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/despesa', rotaDespesa);
app.use('/hospedagem', rotaHospedagem);
app.use('/consumo', rotaConsumo);
app.use('/hospede', rotaHospede);
app.use('/reserva', rotaReserva);
app.use('/servico', rotaServico);
app.use('/tdespesa', rotaTipodespesa);
app.use('/camareiro', rotaCamareiro);
app.use('/atvcamareiro', rotaAtividadecamareiro);
app.use('/quarto', rotaQuarto);
app.use('/produto', rotaProduto);
app.use('/itensconsumo', rotaItensConsumo);
app.use('/consumoserv', rotaConsumoServ);
app.use('/login', rotaLogin);
app.use('/usuario', rotaUsuario);
app.use('/funcionario', rotaFuncionario);

app.listen(4000, () => {
    console.log('Backend ouvindo em http://localhost:4000');
});
