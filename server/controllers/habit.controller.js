const Habit = require('../models/habit.model')

module.exports = {
    findAllHabits: (req, res) => {
        Habit.find() 
            .then((allHabits) => {
                res.status(200).json(allHabits) 
            })
            .catch((err) => {
                res.status(500).json(err); 
            })
    },
    findOneHabit: (req, res) => {
        Habit.findOne({_id: req.params.id}) 
            .then( (oneHabit) => {
                res.status(200).json(oneHabit)
            })
            .catch( (err) => {
                res.status(500).json(err);
            })
    },
    createHabit: (req, res) => {
        console.log(req.body);
        Habit.create(req.body)
            .then((newHabit) => {
                res.status(201).json(newHabit) 
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    updateHabit: (req, res) => {
        Habit.findOneAndUpdate({ _id: req.params.id}, 
            req.body, 
            {new: true, runValidators: true})
            .then((updatedHabit) => {
                res.json(updatedHabit)
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    deleteHabit: (req, res) => {
        Habit.deleteOne({ _id: req.params.id})
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err);
            })

    }

}
