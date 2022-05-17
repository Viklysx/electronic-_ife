export default function charFromElement(element) {
    if (element == null) {
        return " ";
    } else {
        return element.originChar; // возвращаем оригинальный символ
    }      
}