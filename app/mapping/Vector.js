export default function Vector(x, y) { // для предоставления пар координат
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (other) { // сделаем сложение координат и вернем новый вектор с новыми параметрами
    return new Vector(this.x + other.x, this.y + other.y);
};