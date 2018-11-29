'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.get('/users/:id/clock-entries', 'UserController.clockEntries')
Route.resource('/users', 'UserController').middleware('auth')
Route.resource('/clock-entries', 'ClockEntryController').middleware('auth')
Route.get('/login', 'UserController.login').middleware('guest')
Route.post('/login', 'UserController.authenticate')
Route.get('/logout','UserController.logout')
Route.get('/authorize', 'UserController.authorize')
