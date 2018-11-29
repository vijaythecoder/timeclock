'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
async run () {
    const user = await Factory.model('App/Models/User').createMany(10)

    const User = use('App/Models/User')
    for(var i = 1; i < 11; i++)
    {
      const user = await User.find(i)
      for(var j = 1; j < 6; j++)
      {
        const clockEntry = await Factory.model('App/Models/ClockEntry').make(5)
        await user.clockEntries().save(clockEntry)
      }
    }

  }
}
module.exports = UserSeeder
