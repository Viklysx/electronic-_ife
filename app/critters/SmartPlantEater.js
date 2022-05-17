import { directions } from './../utils/directions.js';
import randomElement from './../utils/randomElement.js';

export default function SmartPlantEater() {
    this.energy = 20;
    this.direction = randomElement(Object.keys(directions));
}

SmartPlantEater.prototype.act = function (context) {
    var space = context.find(" "); // ищем свободное пространство
    if (this.energy > 100 && space) { // увеличили энергию им, шоб медленнее размножались
        return { // размножаем существо
            type: "reproduce",
            direction: space
        };
    }
         
    var plants = context.findAll("*"); // ищем все растения рядом
    if (plants.length > 1) {
        return {
            type: "eat",
            direction: randomElement(plants)
        };
    }

    if (context.look(this.direction) != " ") {
        this.direction = space;
    }
        
    if (space) {
        return {
            type: "move",
            direction: space
        };
    }       
};