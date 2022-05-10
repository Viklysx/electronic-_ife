import Vector from "./components/Vector.js";

export const directions = { // направления
    "n": new Vector(0, -1), // север
    "ne": new Vector(1, -1), // северо-восток
    "e": new Vector(1, 0), // восток
    "se": new Vector(1, 1), // юго-восток
    "s": new Vector(0, 1), // юг
    "sw": new Vector(-1, 1), // юго-запад
    "w": new Vector(-1, 0), // запад
    "nw": new Vector(-1, -1) // северо-запад
}