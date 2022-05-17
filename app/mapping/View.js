import { directions } from './../utils/directions.js';
import charFromElement from './../utils/charFromElement.js';
import randomElement from './../utils/randomElement.js';

export default function View(world, vector) {// world - бьъект мира, vector - позиция существа в пространстве
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function (dir) { //вычисляет координаты, на которые мы пытаемся посмотреть, dir - направление
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {// проверяем, находится ли вектор в пределах сетки
        return charFromElement(this.world.grid.get(target)); // извлекаем символ
    } else {
        return "#"; // Для координат снаружи сетки
    }
};

View.prototype.findAll = function (ch) {
    var found = [];
    for (var dir in directions) {// проходимся по объекту направлений
        if (this.look(dir) == ch) { // проверяем, можем ли сделать ход
            found.push(dir); // кладем направление в массив
        }          
    } 
        
    return found;
};

View.prototype.find = function (ch) {
    var found = this.findAll(ch); // находим все допустимые направления
    if (found.length == 0) {
        return null;
    }
    
    return randomElement(found); // берем одно рандомное направление
};