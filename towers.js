module.exports = ()=>{
    let towersCount = 0;
    let towers = _.filter(Game.structures, function (s) {
        towersCount++;
        return s.structureType === STRUCTURE_TOWER
    });

    if (towers) {
        let i = 1;
        for (let tower of towers) {

            if(towersCount>1){

                if(i % 2 === 1){
                    tower.doDefend();
                }
                else{
                    tower.doRepair();
                }
            }
            else{
                if(!tower.doDefend()){
                    tower.doRepair();
                }
            }
            i++;
        }
    }
}
