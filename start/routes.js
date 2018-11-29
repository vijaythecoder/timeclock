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

Route.resource('/users', 'UsersController').middleware('auth')
Route.get('/users/:username/clock-entries', 'UsersController.clockEntries').middleware('auth')
Route.get('/login', 'UsersController.login').middleware('guest')
Route.post('/login', 'UsersController.authenticate')
Route.get('/logout','UsersController.logout')
Route.get('/authorize', 'UsersController.authorize')