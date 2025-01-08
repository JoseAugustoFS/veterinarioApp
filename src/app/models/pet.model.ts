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
        let month = date.getMonth() - this.dateBirth.getMonth();
        let yearSufix = year > 1 ? 'anos' : 'ano';
        let monthSufix = month > 1 ? 'meses' : 'mes';

        return year > 0 ? `${year} ${yearSufix}` : `${month} ${monthSufix}`;
    }
    public canShower(): boolean {
        return true;
    }
    public canGrooming(): boolean {
        return true;
    }
}