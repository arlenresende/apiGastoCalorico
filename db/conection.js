const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb+srv://gastoCalorico22:'+process.env.PASSMONGO+'@gastocalorico.505sszi.mongodb.net/?retryWrites=true&w=majority')
  console.log('Conectou')
}
main().catch((error) => console.log(error))

module.exports = mongoose
