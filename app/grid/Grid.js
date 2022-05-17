import Vector from './../mapping/Vector.js';

export default function Grid(width, height) { // объект сетки с основными методами
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function (vector) {
  return vector.x >= 0 && vector.x < this.width &&
    vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function (vector) { // достаем конкретный элемент
  return this.space[vector.x + this.width * vector.y];
};

Grid.prototype.set = function (vector, value) { // записываем элемент
  this.space[vector.x + this.width * vector.y] = value;
};

Grid.prototype.forEach = function (f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null) {// value - объект функции-конструктора элемента
        f.call(context, value, new Vector(x, y));
      }
    }
  }
};