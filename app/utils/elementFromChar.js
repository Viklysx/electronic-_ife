export default function elementFromChar(legend, ch) {
    // {'#': Wall} - это легенда, # - это ch
    if (ch == " ") {
        return null;
    }
        
    var element = new legend[ch](); // создаём экземпляр нужного типа, находя конструктор символа и применяя к нему new
    element.originChar = ch; // чтобы определять, из какого символа был создан обьект

    return element;
}