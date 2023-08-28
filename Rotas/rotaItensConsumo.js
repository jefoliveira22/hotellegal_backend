import { Router } from "express";
import Itens_ConsumoCTRL from "../Controle/itensconsumoCTRL.js";

const rotaItensConsumo = new Router();
const itensconsumoCtrl = new Itens_ConsumoCTRL();
rotaItensConsumo.post('/', itensconsumoCtrl.gravar)
.get('/', itensconsumoCtrl.consultar)
.get('/:id_prod', itensconsumoCtrl.consultarPeloID);

export default rotaItensConsumo;