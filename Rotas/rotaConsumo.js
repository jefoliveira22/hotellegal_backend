import { Router } from "express";
import ConsumoCTRL from "../Controle/consumoCTRL.js";

const rotaConsumo = new Router();
const consumoCtrl = new ConsumoCTRL();
rotaConsumo.post('/', consumoCtrl.gravar)
.put('/', consumoCtrl.atualizar)
.delete('/', consumoCtrl.excluir)
.get('/', consumoCtrl.consultar)
.get('/:nome', consumoCtrl.consultarPeloNome)
.get('/id/:id_hospedagem', consumoCtrl.consultarPeloID);

export default rotaConsumo;