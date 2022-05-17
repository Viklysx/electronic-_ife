export default function Plant() {
    this.energy = 3 + Math.random() * 4; //Растения начинают со случайного уровня энергии от 3 до 7, чтобы они не размножались все в один ход
}

Plant.prototype.act = function (context) {
    if (this.energy > 15) {
        var space = context.find(" "); //Когда растение достигает энергии 15, а рядом есть пустая клетка – оно размножается в неё
        if (space) { // если ячейка не занята, то размножаемся
            return {
                type: "reproduce",
                direction: space
            };
        }           
    }
    
    if (this.energy < 20) { //Если оно не может размножиться, то просто растёт, пока не достигнет энергии 20
        return {
            type: "grow"
        };
    }      
};