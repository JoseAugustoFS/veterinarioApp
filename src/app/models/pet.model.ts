import { IPet } from "./interfaces/Ipet.interface";

export class Pet implements IPet {
    constructor(
        public id: number, 
        public name: string, 
        public gender: "M" | "F",
        public type: string, 
        public age: number, 
        public owner: string, 
        public race: string, 
        public weight: number) {}
}