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

/** @param {Creep} creep*/
const repairer = (creep) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.keepEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doRepair();
    }
}

/** @param {Creep} creep
 * @param settings
 */
const lorry = (creep,settings) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        creep.memory.working = false;
        for (const from of settings.linkerBasic.from) {
            if (creep.keepEnergyFromStore(from)) break;
        }
    }else{
        creep.memory.working = true;
        for (const to of settings.linkerBasic.to) {
            if (creep.storeEnergyToStorage(to)) {
                break;
            }
        }
        if (creep.store.getUsedCapacity() === 0 )
            creep.memory.working = false ;
    }
}

/** @param {Creep} creep
 * @param settings
 */
const waller = (creep,settings) => {
    const {maxHitsWalls, maxHitsRampart} = settings.defense;


    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.keepEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doRepairDef(maxHitsWalls, maxHitsRampart);
    }
}

const roadRepairer = (creep) => {
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.working){
        if (!creep.keepEnergy())
            creep.memory.working = true;
    }else{
        creep.memory.working = creep.doRepairRoads();
    }
}


module.exports = {
    harvester, builder, updater, harvesterLG, repairer, lorry, waller, roadRepairer
}
