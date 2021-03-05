const {population} = require('settings')
const _ = require('lodash')

module.exports = () => {
    for (const creepsKey in Game.creeps) {
        const creep = Game.creeps[creepsKey]
        const roleInfo = _.find(population,(x)=>x.role === creep.memory.role)
        if (!roleInfo){
            console.log(`[${Game.time}_RUNNER] - cant find role - ${creep.memory.role}`)
            continue;
        }
        roleInfo.run(creep)
    }
}
