const {harvester, builder, updater, harvesterLG} = require("creeps");
module.exports = {
    population: [
        {role: 'harvester', run: harvester, max:3, parts: [WORK,MOVE,CARRY,MOVE,CARRY]},
        {role: 'updater', run: updater, max:2, parts: [WORK,MOVE,CARRY,MOVE,CARRY]},
        {role: 'builder', run: builder, max:2, parts: [WORK,MOVE,CARRY,MOVE,CARRY]},
        {role: 'harvesterLG', run: harvesterLG, max:0, parts: [WORK,MOVE,CARRY,MOVE,CARRY]},
    ]
}
