/**
 * добыча энергии
 * @returns {boolean}
 */
Creep.prototype.mineEnergy = function () {

    if (!this.store.getFreeCapacity())
        return false

    let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

    if (source) {
        if (this.harvest(source) !== OK)
            this.moveTo(source)
    } else {
        source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        this.moveTo(source)
    }

    return true;
};

/**
 * абгрейд контроллера
 * @returns {boolean}
 */
Creep.prototype.doUpgrade = function () {
    if (this.store.getUsedCapacity() === 0)
        return false;

    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE)
        this.moveTo(this.room.controller);

    return true;
};

Creep.prototype.doBuild = function () {

    if (this.store.getUsedCapacity() === 0)
        return false;

    let target = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
    if (target) {
        if (this.build(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        return this.doUpgrade()
    }

    return true
}

Creep.prototype.doRepair = function () {

    if (this.store.getUsedCapacity() === 0)
        return false;

    const target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
            structure.structureType !== STRUCTURE_WALL
            && structure.structureType !== STRUCTURE_RAMPART
            && structure.structureType !== STRUCTURE_ROAD
            && structure.hits < (structure.hitsMax * 0.75)
    });

    if (target) {
        if (this.repair(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        return this.doBuild()
    }

    return true
}

Creep.prototype.doRepairDef = function (maxHitsWalls, maxHitsRampart) {

    if (this.store.getUsedCapacity() === 0)
        return false;

    let target;

    if (!target) {
        let targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.structureType === STRUCTURE_RAMPART && structure.hits <= maxHitsRampart) ||
                (structure.structureType === STRUCTURE_WALL && structure.hits <= maxHitsWalls)
        });
        targets = _.sortBy(targets,x=>x.hits);
        if (targets.length)
            target = targets[0];
    }


    if (target) {
        if (this.repair(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        return this.doBuild()
    }

    return true
}

Creep.prototype.doRepairRoads = function () {

    if (this.store.getUsedCapacity() === 0)
        return false;

    let target;

    if (!target) {
        target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) =>
                structure.structureType === STRUCTURE_ROAD && structure.hits <= structure.hitsMax
        })
    }

    if (target) {
        if (this.repair(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        return this.doBuild()
    }

    return true
}

Creep.prototype.doStore = function () {
    if (!this.store.getUsedCapacity())
        return false

    let structure;

    /*if(Memory.population[creep.memory.spawn]['lorry'] === undefined || Memory.population[creep.memory.spawn]['lorry'] === 0 ){
        //все экстеншены ДОЛЖНЫ быть заполнены!
        structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) =>  s.structureType === STRUCTURE_EXTENSION && s.energy < s.energyCapacity
        });
    }*/


    // ищем ближийший накопитель (Спавн или дополнение)
    if (!structure) {
        let structures = this.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: (s) => ((
                s.structureType === STRUCTURE_SPAWN
                || s.structureType === STRUCTURE_EXTENSION
                || s.structureType === STRUCTURE_TOWER)
                && s.energy < s.energyCapacity)
        });

        if (structures.length > 0) {
            structure = structures[0];
        }
    }


    //аполняем контейнеры
    if (!structure) {
        if (this.room.controller.level > 1) {
            structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 0
            });
        }
    }

    //если уровень контроллера позволяет строить стораджи, то забиваем только их!
    if (!structure) {
        if (this.room.controller.level > 3) {
            structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity
            });
        }
    }


    // если все забили, то забиваем все подряд, что еще не наполнено
    if (!structure) {
        structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => ((s.structureType === STRUCTURE_SPAWN
                || s.structureType === STRUCTURE_EXTENSION
                || s.structureType === STRUCTURE_TOWER)
                && s.energy < s.energyCapacity)
                || ((s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] < s.storeCapacity)
        });
    }


    // совсем на худой конец, есть башни и спауны
    if (!structure) {
        structure = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });

    }

    if (!structure) {
        structure = this.room.storage;
    }
    if (structure) {
        if (this.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

    return true;
}

Creep.prototype.keepEnergy = function (from = null) {

    let container;


    if (!container)
        container = this.pos.findClosestByPath(FIND_TOMBSTONES, {
            filter: x => x.store.energy > 0
        })
    /*Подымаем выкинутые вещи*/
    if (!container)
        container = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

    /*Руины*/
    if (!container)
        container = this.pos.findClosestByPath(FIND_RUINS, {
            filter: s => (
                s.store[RESOURCE_ENERGY] > 0
            )
        });


    if (!container)
        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (
                (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE)
                && s.store[RESOURCE_ENERGY] > 0)
                || (s.structureType === STRUCTURE_LINK && s.energy > 0)
        });


    if (container) {
        if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return true;
    } else {
        return this.mineEnergy();
    }

}

Creep.prototype.keepEnergyFromStore = function (from) {

    let container;

    if (!container)
        container = this.pos.findClosestByPath(FIND_TOMBSTONES, {
            filter: x => x.store.energy > 0
        })
    /*Подымаем выкинутые вещи*/
    if (!container)
        container = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

    if (!container)
        container = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) =>
                structure.structureType === STRUCTURE_CONTAINER &&
                structure.pos.x === from.x &&
                structure.pos.y === from.y &&
                structure.store[RESOURCE_ENERGY] > 100

        })

    if (!container)
        return false;

    if (this.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
    }

    return true;

}

Creep.prototype.storeEnergyToStorage = function (to) {
    const container = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
            structure.pos.x === to.x &&
            structure.pos.y === to.y &&
            (structure.energy < structure.energyCapacity || structure.store.getFreeCapacity() > 0)
    })

    if (!container)
        return false;

    if (this.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
    }

    return true;
}

StructureTower.prototype.doRepair = function () {

    if (this.store.getUsedCapacity() === 0)
        return false;

    const target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) =>
            structure.structureType !== STRUCTURE_WALL
            && structure.structureType !== STRUCTURE_RAMPART
            && structure.structureType !== STRUCTURE_ROAD
            && structure.hits < (structure.hitsMax * 0.75)
    });

    if (target) {
        this.repair(target)
    }

    return true
}

StructureTower.prototype.doDefend = function () {

    if (this.store.getUsedCapacity() === 0)
        return false;

    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target) {
        this.attack(target);
    }

    return true
}
