const { userModel, flightModel } = require('../models');

function getFlightOrigins(req, res, next) {
    return flightModel.find().distinct('origin')
        .then(origins => {
            res.status(200).json(origins);
        });
}

function getFlightsDestinations(req, res, next) {
    return flightModel.find().distinct('destination')
        .then(departures => {
            res.status(200).json(departures);
        });
}

function getFlights(req, res, next) {
    flightModel.find()
        .sort({ created_at: -1 })
        .then(flights => {
            res.status(200).json(flights);
        })
        .catch(next);
}

function getAllFlightsOfUser(req, res, next) {
    const { userId } = req.params;
    flightModel.find({ bookedBy: { $all: [userId] } })
        .then(flights => {
            res.status(200).json(flights);
        })
        .catch(next);
}

function getPastFlightsOfUser(req, res, next) {
    const { userId } = req.params;
    flightModel.find({ bookedBy: { $all: [userId] }, depart: { $lt: new Date() } })
        .then(flights => {
            res.status(200).json(flights);
        })
        .catch(next);
}

function getUpcomingFlightsOfUser(req, res, next) {
    const { userId } = req.params;
    flightModel.find({ bookedBy: { $all: [userId] }, depart: { $gte: new Date() } })
        .then(flights => {
            res.status(200).json(flights);
        })
        .catch(next);
}


function getCurrentFlightsByOriginDestination(req, res, next) {
    const { orig, dest } = req.params;
    flightModel.find({ origin: orig, destination: dest, depart: { $gte: new Date() } })
        .sort({ created_at: -1 })
        .then(flights => {
            res.status(200).json(flights);
        })
        .catch(next);
}

function getFlightById(req, res, next) {
    const { flightId } = req.params;
    return flightModel.findById(flightId)
        .then(flight => {
            res.status(200).json(flight);
        });
}

function getByFlightNumber(req, res, next) {
    let { flightNumber } = req.params;
    return flightModel.find({ flightNumber: +flightNumber })
        .then(flight => {
            res.status(200).json(flight);
        });
}

async function postNewFlight(req, res, next) {
    const data = req.body;
    flightModel.create({ ...data })
        .then(flight => {
            if (flight) {
                res.status(200).json(flight);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteFlight(req, res, next) {
    const { flightId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        flightModel.findOneAndDelete({ _id: flightId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { flights: flightId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function paptchEditFlight(req, res, next) {
    const { flightId } = req.params;
    const flightData = req.body;

    // if the userId is not the same as this one of the flights, the flight will not be updated
    flightModel.findOneAndUpdate({ _id: flightId }, flightData, { new: true })
        .then(updatedFlight => {
            if (updatedFlight) {
                res.status(200).json(updatedFlight);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function bookFlight(req, res, next) {
    const { flightId, userId } = req.body;
    Promise.all([
        flightModel.findByIdAndUpdate(flightId, { $push: { "bookedBy": userId } }),
        userModel.findByIdAndUpdate(userId, { $push: { "flights": flightId } }),
    ])
        .then(([updatedFlight, updatedUser, __]) => {
            if (updatedFlight && updatedUser) {
                res.status(200).json(updatedFlight);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);;
}

module.exports = {
    getFlights,
    getAllFlightsOfUser,
    getPastFlightsOfUser,
    getUpcomingFlightsOfUser,
    getFlightOrigins,
    getFlightsDestinations,
    getCurrentFlightsByOriginDestination,
    getFlightById,
    getByFlightNumber,
    postNewFlight,
    paptchEditFlight,
    deleteFlight,
    bookFlight
};