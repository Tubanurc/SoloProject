const HabitController = require('../controllers/habit.controller')

module.exports = (app) => {
    app.get('/api/allHabits', HabitController.findAllHabits)
    app.post('/api/createHabit', HabitController.createHabit)
    app.get('/api/findOneHabit/:id', HabitController.findOneHabit)
    app.put('/api/updateHabit/:id', HabitController.updateHabit)
    app.delete('/api/deleteHabit/:id', HabitController.deleteHabit)
}