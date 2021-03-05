const {population} = require('settings')
const _ = require('lodash')

module.exports = () => {
    for (const spawnsKey in Game.spawns) {
        const spawn = Game.spawns[spawnsKey]

        if (!spawn || spawn.spawning) continue;

        for (const pInfo of population) {
            const {role, max, parts} = pInfo;
            const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role && creep.memory.spawn === spawn.room.name);
            if (creeps.length >= max) continue;
            const name = `${role}_${Game.time}`;
            let res = spawn.spawnCreep(parts, name,{
                memory:{
                    role: role,
                    spawn: spawn.room.name
                }
            });
            if(res === OK){
                console.log(`[${Game.time}_SPAWNER] Spawning new creep ${name} at spawn - ${spawn.room.name} with role ${role}`)
            }

        }


    }
}
