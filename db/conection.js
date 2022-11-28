const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb+srv://gastoCalorico22:gasto2022@gastocalorico.505sszi.mongodb.net/?retryWrites=true&w=majority')
  console.log('Conectou')
}
main().catch((error) => console.log(error))

module.exports = mongoose
