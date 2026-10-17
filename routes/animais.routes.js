import { Router } from 'express';
import { 
    listar, 
    cadastrarAnimal, 
    atualizarAnimalHandler, 
    deletarAnimalHandler, 
    exibirFormCadastro, 
    exibirFormEdicao 
} from '../controllers/animais.controller.js';

const router = Router();

router.get('/listaAnimais',      listar);
router.get('/novo',              exibirFormCadastro);
router.post('/cadastrarAnimais', cadastrarAnimal);
router.get('/editar/:id',        exibirFormEdicao);
router.post('/atualizar/:id',    atualizarAnimalHandler);
router.post('/excluir/:id',      deletarAnimalHandler);

export default router;