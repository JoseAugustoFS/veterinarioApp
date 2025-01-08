export interface IPet {
    id: number;
    name: string;
    gender: "M" | "F";
    type: string;
    dateBirth: Date;
    owner: string;
    race: string;
    weight: number;

    getAge(): string;

    canShower(): boolean;

    canGrooming(): boolean;

}