const db = require('../models/index.js')
const Ticket = db.tickets
const Tansportation = db.transportation
const Payment = db.payment

const bookTicket = (req, res) => {
    const {
        user,
        transportation,
        departure,
        destination,
        date,
        price
    } = req.body

    //test transportation capacity
    const trans = Tansportation.findByPK(transportation)
    const allBookedTickets = Ticket.findAll({ where: { transportation: transportation } })
    if (allBookedTickets?.length < trans.capacity) {
        const bookedTicket = Ticket.create({ user, transportation, departure, destination, date, price })
        res.status(200).json({message:"ticket booked successfully", bookedTicket})
    }
    else{
        res.status(400).send({message:"no more available places"})
    }
}