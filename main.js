require('protos')
const gc = require('gc')
const spawner = require('spawner')
const runner = require('runner')

module.exports.loop = ()=>{
    gc();
    spawner();
    runner()
}
