import View from '../mapping/View.js';
import World from './World.js';
import { actionTypes } from './../actions/actionTypes.js';

export default function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype); // прототип основан на прототипе World

LifelikeWorld.prototype.letAct = function (critter, vector) {//letAct передаёт работу по совершению действий в разные функции, хранящиеся в объекте actionTypes.
    var action = critter.act(new View(this, vector));//Метод act возвращает какое-либо действие. {type: 'move', direction: 'n'}
    var handled = action &&
        action.type in actionTypes && // action.type - конкректное действие, actionTypes - объект с методами, объявленными выше
        actionTypes[action.type].call(this, critter, vector, action); // call, чтобы дать функции доступ к мировому объекту через this.

    if (!handled) {// Если действие по какой-либо причине не сработало, действием по умолчанию для существа будет ожидание. Он теряет 0.2 единицы энергии, а когда его уровень энергии падает ниже нуля, он умирает и исчезает с сетки.
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};