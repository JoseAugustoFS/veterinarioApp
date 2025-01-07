export interface IPet {
    id: number;
    name: string;
    gender: "M" | "F";
    type: string;
    age: number;
    owner: string;
    race: string;
    weight: number;
}