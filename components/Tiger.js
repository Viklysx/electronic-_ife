import {directions} from "../directions.js";
import {randomElement} from "../utils.js";

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

    var prey = context.findAll("O"); // массив доступных направлений по этому символу (травоядные)
    if (prey.length && this.energy < 80) {
        return {
            type: "eat",
            direction: randomElement(prey)
        };
    }

    if (context.look(this.direction) != " ") {
        this.direction = context.find(" ") || "s";
    }

    if (space) {
        return {
            type: "move",
            direction: this.direction
        };
    }  
};