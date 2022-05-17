import {dirPlus} from '../utils/charFromElement.js';

export default function WallFollower() {
    this.dir = "s"; // задаем первоначальное направление на юг
}

WallFollower.prototype.act = function (view) {// view - определяет положение вектора в пространстве и можем ли мы сделать шаг
    var start = this.dir; // задаем текущее направление
    if (view.look(dirPlus(this.dir, -3)) != " ") {
        start = this.dir = dirPlus(this.dir, -2); // на 2 индекса сместились по направлениям
    }
        
    while (view.look(this.dir) != " ") {// если столкновение со стеной (делаем до тех пор, пока не встретится пустая строка)
        this.dir = dirPlus(this.dir, 1); // то берем другое направление, смотрим по индексу, который больше на единицу
        if (this.dir == start) break;
    }

    return {
        type: "move",
        direction: this.dir
    };// делаем смещение
};