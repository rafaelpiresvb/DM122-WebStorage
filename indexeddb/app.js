import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";
import { MyFirstModule, MySecondModule } from "./myFirstModule.js";

MyFirstModule("Hi there!");
MySecondModule("Second Module");

console.log(Dexie);