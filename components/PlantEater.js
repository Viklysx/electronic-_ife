export default function PlantEater() {
    this.energy = 20;
}

PlantEater.prototype.act = function (context) {
    var space = context.find(" "); // ищем свободное пространство
    if (this.energy > 60 && space) {
        return { // размножаем существо
            type: "reproduce",
            direction: space
        };
    }
        
    var plant = context.find("*"); // ищем растение и если оно есть - возвращаем направление
    if (plant) {
        return {
            type: "eat",
            direction: plant
        };
    }
        
    if (space) {
        return {
            type: "move",
            direction: space
        };
    }       
};