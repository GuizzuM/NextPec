import { Router } from 'express';
import animaisRoutes  from './animais.routes.js';
import fazendaRoutes  from './fazendas.routes.js';

const router = Router();

router.get('/', (req, res) => {
    const nome = req.query.nome || 'Visitante';
    res.render('index', { nome });
});

router.use('/animais',  animaisRoutes);
router.use('/fazendas', fazendaRoutes); 

export default router;