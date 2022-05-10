import {directions} from "../directions.js";
import {randomElement} from "../utils.js";

export default function BouncingCritter() {
    this.direction = randomElement(Object.keys(directions));
};

BouncingCritter.prototype.act = function (view) {  // view - объект, который позволяет изучить прилегающую местность
    if (view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "s"; // ищем пустое место, куда встать
    }
        
    return {
        type: "move",
        direction: this.direction
    };
};