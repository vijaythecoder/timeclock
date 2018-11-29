'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    password: 'vijay',
    max_hours: faker.integer({ min: 3, max: 20 }),
    email: faker.email()
  }
})

Factory.blueprint('App/Models/ClockEntry', async (faker) => {
    return {
        starts_at: faker.date(),
        ends_at: faker.date()
    }
})
