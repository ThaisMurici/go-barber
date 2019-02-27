const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async user (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('user-dashboard', { providers })
  }

  async provider (req, res) {
    const today = moment()
    const provider = req.session.user
    const appointments = await Appointment.findAll({
      where: {
        provider_id: provider.id,
        date: {
          [Op.between]: [
            today.startOf('day').format(),
            today.endOf('day').format()
          ]
        }
      },
      include: [{ model: User, as: 'user' }]
    })

    return res.render('provider-dashboard', { appointments })
  }
}

module.exports = new DashboardController()
