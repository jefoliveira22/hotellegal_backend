import { Router } from "express";
import ProdutoCTRL from "../Controle/produtoCTRL.js";

const rotaProduto = new Router();
const produtoCtrl = new ProdutoCTRL();
rotaProduto.post('/', produtoCtrl.gravar)
.put('/', produtoCtrl.atualizar)
.delete('/', produtoCtrl.excluir)
.get('/', produtoCtrl.consultar)
.get('/:nome_prod', produtoCtrl.consultarPeloNome);

export default rotaProduto;