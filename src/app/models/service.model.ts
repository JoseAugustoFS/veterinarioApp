import { IService } from "../interfaces/iservice";

export class Service implements IService {

    constructor(
        public id: number,
        public type: string,
        public description: string,
        public date: Date,
        public petId: number,
        public petName: string,
        public petOwner: string) {}


}