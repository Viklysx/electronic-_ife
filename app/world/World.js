import charFromElement from '../utils/charFromElement.js';
import elementFromChar from '../utils/elementFromChar.js';
import { directions } from '../utils/directions.js';
import Grid from './../grid/Grid.js';
import Vector from './../mapping/Vector.js';
import View from './../mapping/View.js';

export default function World(map, legend) {  
    var grid = new Grid(map[0].length, map.length); // объект сетки
    
    this.grid = grid;
    this.legend = legend; // объект, сообщающий, что означает каждый из символов карты ({'#: Wall})

    map.forEach(function (line, y) { // пробегаемся по строкам
        for (var x = 0; x < line.length; x++) {
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));// создаем элемент и устанавливаем его в сетку. Здесь передается Vector {x, y} и конструктор элемента, например Plant {energy, originChar}
        }
    });
}

World.prototype.toString = function () { //Метод строит карту в виде строки из текущего состояния мира, проходя двумерным циклом по клеткам сетки
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y)); // достаем элемент по координатам
            output += charFromElement(element);// добавляем его
        }
        output += "\n";
    }
    return output;
};
 
World.prototype.letAct = function (critter, vector) { // получаем существо и вектор - текущее расположение
    var action = critter.act(new View(this, vector));// View - функциональный констр-р, который будет определять, в каком месте находится объект и можем ли сделать шаг. Метод act возвращает какое-либо действие.
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null); // вектор, с которого прыгнули устанаыливаем в null
            this.grid.set(dest, critter);// устанавливаем по координатам сущесвто
        }
    }
};

World.prototype.turn = function () { // один ход. Он будет обходить сетку методом forEach, и искать объекты, у которых есть метод act
    var acted = [];// для хранения массива существ, которые уже сделали свой шаг, чтобы игнорировать их при повторном проходе
    this.grid.forEach(function (critter, vector) {// пробегаемся по сетке, вызывая метод forEach класса Grid. Второй параметр метода forEach используется для доступа к правильной переменной this во внутренней функции
        if (critter.act && acted.indexOf(critter) == -1) {// если у существа есть метод act и в нашем массиве acted нет существа, которое сделало ход
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

// action - {type: 'move', direction: 'n'}

World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) { // если есть такое направление
        var dest = vector.plus(directions[action.direction]); // получаем результирующий вектор
        if (this.grid.isInside(dest)) {// если вектор внутри сетки, то возвращаем его
            return dest;
        }           
    }
};