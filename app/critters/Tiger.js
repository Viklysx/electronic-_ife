import { directions } from './../utils/directions.js';
import randomElement from './../utils/randomElement.js';

export default function Tiger() {
    this.energy = 100; // энергия
    this.direction = randomElement(Object.keys(directions));
}

Tiger.prototype.act = function (context) {
    var space = context.find(" ");
    if (this.energy > 300 && space) {
        return {
            type: "reproduce",
            direction: space
        };
    }

    var victim = context.findAll("O"); // массив доступных направлений по этому символу (травоядные)
    if (victim.length > 1 && this.energy < 100) {
        return {
            type: "eat",
            direction: randomElement(victim)
        };
    }

    if (context.look(this.direction) != " ") {
        this.direction = space;
    }

    if (space) {
        return {
            type: "move",
            direction: this.direction
        };
    }  
};