import express from 'express';
import getAddress from './services/getAddress';

const router = express.Router();

router.get('/:cep', getAddress);

export default router;