/*Init default functions*/
require('prototypes')

const gc = require('gc')
const spawner = require('spawner')
const runner = require('runner')
const towers = require('towers')


module.exports.loop = ()=>{
    gc();
    spawner();
    runner();
    towers();
    
    if (Game.cpu.bucket >= 10000){
        Game.notify('Generate new pixel')
        Game.cpu.generatePixel()
        console.log('Generate new pixel')
    }
}
