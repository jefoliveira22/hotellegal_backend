import { Router } from "express";
import QuartoCTRL from "../Controle/quartoCTRL.js";

const rotaQuarto = new Router();
const quartoCtrl = new QuartoCTRL();
rotaQuarto.post('/', quartoCtrl.gravar)
.put('/', quartoCtrl.atualizar)
.delete('/', quartoCtrl.excluir)
.get('/', quartoCtrl.consultar)
.get('/vazio/', quartoCtrl.consultarQuartoVazio)
.get('/:nomequarto', quartoCtrl.consultarPeloNome);

export default rotaQuarto;