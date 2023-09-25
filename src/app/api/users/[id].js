import { apiHandler} from 'helpers/api'
import { usersActions } from '@/helpers/Controllers'
export default apiHandler({
  get: getById,
  put: update,
  delete: _delete
})

async function getById (req, res) {
  const user = await usersActions.getById(req.query.id)

  if (!user) throw 'User Not Found'

  return res.status(200).json(user)
}

async function update (req, res) {
  await usersActions.update(req.query.id, req.body)
  return res.status(200).json({})
}

async function _delete (req, res) {
  await usersActions.delete(req.query.id)
  return res.status(200).json({})
}
