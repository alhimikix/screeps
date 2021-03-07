const {harvester, builder, updater, harvesterLG, repairer, lorry, waller, roadRepairer} = require("creeps");
module.exports = {
    population: [
        {role: 'harvester', run: harvester, max: 6, parts: [WORK, WORK, MOVE, CARRY, MOVE, CARRY]},
        {role: 'updater', run: updater, max: 5, parts: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]},
        {role: 'builder', run: builder, max: 2, parts: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE]},
        {role: 'repairer', run: repairer, max: 1, parts: [WORK, MOVE, CARRY, MOVE, CARRY]},
        {role: 'harvesterLG', run: harvesterLG, max: 0, parts: [WORK, MOVE, CARRY, MOVE, CARRY]},
        {role: 'lorry', run: lorry, max: 1, parts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]},
        {role: 'waller', run: waller, max: 2, parts: [WORK, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]},
        {role: 'roader', run: roadRepairer, max: 1, parts: [WORK, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]},
    ],
    linkerBasic: {
        from: [
            {x: 39, y: 18},
            {x: 43, y: 22},
        ],
        to: [
            {x: 40, y: 14}, //ext
            {x: 42, y: 14}, //ext
            {x: 43, y: 15}, //ext
            {x: 39, y: 15}, //ext
            {x: 41, y: 17}, //ext
            {x: 41, y: 15}, //spawn
            {x: 41, y: 13}, //container
            {x: 42, y: 16}, //container
            {x: 40, y: 16}, //container
        ]
    },
    defense: {
        maxHitsWalls: 100000,
        maxHitsRampart: 100000
    }
}
