/*Init default functions*/
require('prototypes')

const gc = require('gc')
const spawner = require('spawner')
const runner = require('runner')

module.exports.loop = ()=>{
    gc();
    spawner();
    runner();

    if (Game.cpu.bucket >= 10000){
        Game.notify('Generate new pixel')
        Game.cpu.generatePixel()
    }
}
