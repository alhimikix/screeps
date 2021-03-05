const {harvester, builder, updater, harvesterLG} = require("creeps");
module.exports = {
    population: [
        {role: 'harvester', run: harvester, max:1, parts:[WORK,MOVE,CARRY,MOVE,CARRY]},
        {role: 'builder', run: builder, max:0, parts:[]},
        {role: 'updater', run: updater, max:0, parts:[]},
        {role: 'harvesterLG', run: harvesterLG, max:0, parts:[]},
    ]
}
