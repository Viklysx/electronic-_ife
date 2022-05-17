import { directions } from './directions';

var directionNames = Object.keys(directions);

export default function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8]; // 8 - потому что 8 направлений
}