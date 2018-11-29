'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
class UsersController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const users = await User.all()
    return view.render('users.index', { users: users.toJSON() })
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('users.create', { user: [] })
  }


  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.max_hours = request.input('max_hours')
    
    await user.save();
    session.flash({ notification: 'User added!' })
    return response.redirect('/users')
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    
    const user = await User.find(params.id)
    return view.render('users.show', { user: user.toJSON() })
	
}

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const user = await User.find(params.id)
    return view.render('users.edit', { user: user.toJSON() })
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {

    const user = await User.find(params.id)
    user.id = request.input('id')
    user.max_hours = request.input('max_hours')
    
    await user.save();
    session.flash({ notification: 'User Updated!' })
    return response.redirect('/users')
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {
    const user = await User.find(params.id)
    await user.delete()
    session.flash({ notification: 'User Deleted!' })
    return response.redirect('/users')
  }
  
  
  /**
   * Login View.
   * GET login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, auth, response, session, view }) {
    const cookies = request.cookies()
    console.log(cookies)
    return view.render('login')
  }
  
  /**
   * Authenticate a user.
   * POST authenticate
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async authenticate ({ request, auth, response, session }) {
    await auth.logout()

    const { email, password } = request.all()
    await auth.attempt(email, password)   

    session.flash({ notification: 'Successfully logged in' })        
    return response.redirect('/users')
  }

  async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }

  async authorize({ auth, response, request }) {
    response.cookie('cartValue', 210)

    // or
    response.cookie('cartValue', 210, {
      httpOnly: true
    })
  }

  async clockEntries({ auth, response, params }) {
    const clockEntries = await User.findBy('username', params.username)
    return view.render('users.clock-entries', { clockEntries: clockEntries.toJSON() })
  }

}

module.exports = UsersController