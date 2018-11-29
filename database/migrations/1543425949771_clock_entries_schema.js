'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClockEntriesSchema extends Schema {
  up () {
    this.create('clock_entries', (table) => {
      table.increments()
      table.dateTime('starts_at')
      table.dateTime('ends_at')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('clock_entries')
  }
}
module.exports = ClockEntriesSchema
