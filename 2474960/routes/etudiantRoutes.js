const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/etudiantController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, ctrl.getEtudiants);
router.get('/:id', authMiddleware, ctrl.getEtudiantById);
router.post('/', authMiddleware, ctrl.createEtudiant);
router.put('/:id', authMiddleware, ctrl.updateEtudiant);
router.delete('/:id', authMiddleware, ctrl.deleteEtudiant);

module.exports = router;
