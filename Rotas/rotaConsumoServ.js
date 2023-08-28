import { Router } from "express";
import Consumo_ServCTRL from "../Controle/consumo_servCTRL.js";

const rotaConsumoServ = new Router();
const consumo_servCTRL = new Consumo_ServCTRL();
rotaConsumoServ.post('/', consumo_servCTRL.gravar)
.put('/', consumo_servCTRL.atualizar)
.delete('/', consumo_servCTRL.excluir)
.get('/', consumo_servCTRL.consultar)
.get('/:nome', consumo_servCTRL.consultarPeloNome)
.get('/id/:id_hospedagem', consumo_servCTRL.consultarPeloID);

export default rotaConsumoServ;