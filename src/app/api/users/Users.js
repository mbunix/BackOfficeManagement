import { apiHandler } from 'helpers/api'
import { usersActions } from '@/helpers/Controllers'

export default apiHandler({
  //POST /users/register
  post: register,
  //POST /users/authenticate
  get: getAll
})
// create a user account

async function register (req, res) {
  await usersActions.create(req.body)
  return res.status(200).json({})
}
// get all users
async function getAll (req, res) {
  const users = await usersActions.getAll()
  return res.status(200).json(users)
}
