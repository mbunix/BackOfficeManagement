import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new Mongoose.Schema({
  email: {
    type: 'string',
    required: true,
    unique: [true, 'This account already exists'],
    validate:[validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: 'string',
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select : false
  },
  role: {
    type: 'string',
    enum: {
      values: ['user', 'admin'],
    },
    default: 'user'
  },
  FirstName: {
    type: 'string',
    required: true,
  },
  LastName: {
    type: 'string',
    required: true,
  },
  PhoneNumber: {
    type: 'string',
    required: true,
  },
  Profession: {
    type: 'string',
    required: true,
  },
  Address: {
    type: 'string',
    required: true,
  },
  Gender: {
    type: 'string',
    enum: {
      values: ['Male', 'Female','Other'],
    }
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
})
// encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
export default mongoose.models.User || mongoose.model('User', userSchema)
