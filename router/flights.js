const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { flightController } = require('../controllers');

// middleware that is specific to this router

router.get('/', flightController.getFlights);
router.get('/:flightId', auth(), flightController.getFlightById);
router.get('/query/:orig/:dest', flightController.getFlightsByOriginDestination);
router.get('/flightnum/:flightNumber', auth(), flightController.getByFlightNumber);
router.get('/cities/origins', flightController.getFlightOrigins);
router.get('/cities/destinations', flightController.getFlightsDestinations);

router.post('/create', auth(), flightController.postNewFlight);
router.patch('/:flightId/update', auth(), flightController.paptchEditFlight);
router.delete('/:flightId/delete', auth(), flightController.deleteFlight);

module.exports = router

