import { IPet } from "./interfaces/IPet.interface";

export class Pet implements IPet {
    constructor(
        public id: number, 
        public name: string, 
        public gender: "M" | "F",
        public type: string, 
        public dateBirth: Date, 
        public owner: string, 
        public race: string, 
        public weight: number) {}


    public getAge(): string {
        let date = new Date();
        let year = date.getFullYear() - this.dateBirth.getFullYear();
        if(year > 1) {
            return `${year} anos`;
        }else if(year === 1 && date.getMonth() === this.dateBirth.getMonth()) {
            return `${year} ano`;
        }else if(date.getMonth() != this.dateBirth.getMonth()){
            let monthDiference = date.getMonth() - this.dateBirth.getMonth() + 12;
            return `${monthDiference} meses`;
        }else {
            let days = date.getDay() - this.dateBirth.getDay();
            return days > 1 ? `${days} dias` : "1 dia";
        }
    }
    public canShower(): boolean {
        return true;
    }
    public canGrooming(): boolean {
        return true;
    }
}