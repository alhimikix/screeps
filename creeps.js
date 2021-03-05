/** @param {Creep} creep*/
const harvester = (creep) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.mineEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doStore();
    }
}

/** @param {Creep} creep*/
const builder = (creep) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.keepEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doBuild();
    }
}

/** @param {Creep} creep*/
const updater = (creep) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.keepEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doUpgrade();
    }
}

/** @param {Creep} creep*/
const harvesterLG = (creep) => {

}

module.exports = {
    harvester, builder, updater, harvesterLG
}
