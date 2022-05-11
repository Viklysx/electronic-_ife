import World from "./World.js";
import View from "./View.js";
import {elementFromChar} from "../utils.js";

export default function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype); // прототип основан на прототипе World

var actionTypes = Object.create(null);
actionTypes.grow = function (critter) { // рост энергии существа
    critter.energy += 0.5;
    return true;
};

actionTypes.move = function (critter, vector, action) {
    var dest = this.checkDestination(action, vector);// предоставляет ли действие допустимое направление
    if (dest == null || // если ячейка пустая или энергии недостаточно
        critter.energy <= 1 ||
        this.grid.get(dest) != null) { // элемент не равен null
        return false; // не можем передвнутся и занять место другого существа
    }

    critter.energy -= 1; // уменьшаем энергию
    this.grid.set(vector, null); // делам смену позиций векторов
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function (critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null) { // если клетка не пустая или энергия равна null 
        return false;
    };

    critter.energy += atDest.energy; // прибавляем существу энергию добычи
    this.grid.set(dest, null); // на место растения поставили пустое пространство
    return true;
};

actionTypes.reproduce = function (critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar); // создаём гипотетического отпрыска, используя elementFromChar на оригинальном существ
    var dest = this.checkDestination(action, vector);
    if (dest == null ||
        critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) != null) {
            return false;
    }
        
    critter.energy -= 2 * baby.energy; // для размножения нужно вдвое больше энергии
    this.grid.set(dest, baby); //отпрыск помещается на сетку
    return true;//Если всё в порядке, отпрыск помещается на сетку (и перестаёт быть гипотетическим), а энергия тратится.
};

LifelikeWorld.prototype.letAct = function (critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter, vector, action); // call, чтобы дать функции доступ к мировому объекту через this.

    if (!handled) {// Если действие по какой-либо причине не сработало, действием по умолчанию для существа будет ожидание. Он теряет 0.2 единицы энергии, а когда его уровень энергии падает ниже нуля, он умирает и исчезает с сетки.
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};