import {directions} from "./directions.js";

export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function elementFromChar(legend, ch) {
    // {'#': Wall} - это легенда, # - это ch
    if (ch == " ") {
        return null;
    }
        
    var element = new legend[ch]();
    element.originChar = ch; // чтобы определять, из какого символа был создан обьект

    return element;
}

export function charFromElement(element) {
    if (element == null) {
        return " ";
    } else {
        return element.originChar; // возвращаем оригинальный символ
    }      
}

var directionNames = Object.keys(directions);

export function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8]; // 8 - потому что 8 направлений
}