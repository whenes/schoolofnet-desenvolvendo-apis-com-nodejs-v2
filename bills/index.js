import express from 'express';
import create from './services/create';
import remove from './services/remove';
import list from './services/list';

const router = express.Router();

router.post('/', create);
router.delete('/:id', remove);
router.get('/', list);

export default router;