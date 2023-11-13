import { Router } from "express";
import DespesaCTRL from "../Controle/despesaCTRL.js";

const rotaDespesa = new Router();
const despesaCtrl = new DespesaCTRL();
rotaDespesa.post('/', despesaCtrl.gravar)
.put('/', despesaCtrl.atualizar)
.delete('/', despesaCtrl.excluir)
.get('/', despesaCtrl.consultar)
.get('/:id_despesa', despesaCtrl.consultarPeloID)
.get('/:data_comp', despesaCtrl.consultarPeloPeriodo);

export default rotaDespesa;