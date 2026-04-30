const express = require('express');
const router = express.Router();

const solicitudController = require('../controllers/solicitud.controller');

router.post('/', solicitudController.crearSolicitud);

router.get('/pendientes', solicitudController.listarPendientes);

router.put('/:id/aprobar', solicitudController.aprobarSolicitud);

router.delete('/:id/rechazar', solicitudController.rechazarSolicitud);

module.exports = router;