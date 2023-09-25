import getConfig from 'next/config'
import mongoose from 'mongoose'
import usermodels from '@/models/usermodels'
const { serverRuntimeConfig } = getConfig()

mongoose.connect(
  process.env.MONGODB_URI || serverRuntimeConfig.connectionString
)
mongoose.Promise = global.Promise

export const db = {
  User: usermodels()
}
