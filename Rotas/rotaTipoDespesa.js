import { Router } from "express";
import TipodespesaCTRL from "../Controle/tipodespesaCTRL.js";

const rotaTipodespesa = new Router();
const tipodespesaCtrl = new TipodespesaCTRL();
rotaTipodespesa.post('/', tipodespesaCtrl.gravar)
.put('/', tipodespesaCtrl.atualizar)
.delete('/', tipodespesaCtrl.excluir)
.get('/', tipodespesaCtrl.consultar)
.get('/:id', tipodespesaCtrl.consultarPeloID);

export default rotaTipodespesa;