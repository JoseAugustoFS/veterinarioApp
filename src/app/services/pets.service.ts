import { Injectable } from '@angular/core';
import { Pool, neon } from "@neondatabase/serverless";
import { IPet } from '../interfaces/IPet.interface';
import { Pet } from '../models/pet.model';

const sql = neon(import.meta.env.DATABASE_URL);

@Injectable({
  providedIn: 'root'
})

export class PetsService {
  
  constructor() { }
  
  public async getAllPets(): Promise<IPet[]> {
    const data = await sql`SELECT * FROM pets;`;
    
    const pets: IPet[] = data.map((petData: any) => {
      return new Pet(petData.id, petData.name, petData.gender, petData.type, new Date(petData.datebirth), petData.owner, petData.race, petData.weight);
    });
    return pets;
  }

  public async getPetsByOwner(owner: string): Promise<IPet[]> {
    const data = await sql`SELECT * FROM pets WHERE owner = ${owner};`;
    const pets: IPet[] = data.map((petData: any) => {
      return new Pet(petData.id, petData.name, petData.gender, petData.type, new Date(petData.datebirth), petData.owner, petData.race, petData.weight);
    });
    return pets;
  }

  public async getAllOwners(): Promise<string[]> {
    const data = await sql`SELECT DISTINCT owner FROM pets;`;
    const owners: string[] = data.map((petData) => {
      return petData['owner'];
    });
    return owners;
  }
  
  public async addPet(pet: IPet): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `INSERT INTO pets (name, gender, type, dateBirth, owner, race, weight) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [pet.name, pet.gender, pet.type, pet.dateBirth, pet.owner, pet.race, pet.weight]
    );
    pool.end();
  }

  public async updatePet(pet: IPet): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `UPDATE pets 
       SET name = $1, gender = $2, type = $3, dateBirth = $4, owner = $5, race = $6, weight = $7 
       WHERE id = $8`,
      [pet.name, pet.gender, pet.type, pet.dateBirth, pet.owner, pet.race, pet.weight, pet.id]
    );
    pool.end();
  }

  public async deletePet(id: number): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `DELETE FROM pets WHERE id = $1`,
      [id]
    );
    pool.end();
  }

  public async searchPet(filter: {name: string, gender: string, type: string, owner: string, race: string, firstDate: string, lastDate: string, minWeight:number, maxWeight: number}): Promise<IPet[]> {
    const data = await sql`
      SELECT * FROM pets 
      WHERE LOWER(name) LIKE ${'%' + filter.name.toLowerCase() + '%'} 
      AND LOWER(gender) LIKE ${'%' + filter.gender.toLowerCase() + '%'} 
      AND LOWER(type) LIKE ${'%' + filter.type.toLowerCase() + '%'} 
      AND LOWER(owner) LIKE ${'%' + filter.owner.toLowerCase() + '%'} 
      AND LOWER(race) LIKE ${'%' + filter.race.toLowerCase() + '%'}
      AND datebirth BETWEEN ${filter.firstDate} AND ${filter.lastDate}
      AND weight BETWEEN ${filter.minWeight} AND ${filter.maxWeight};
    `;
    const pets: IPet[] = data.map((petData: any) => {
      return new Pet(petData.id, petData.name, petData.gender, petData.type, new Date(petData.datebirth), petData.owner, petData.race, petData.weight);
    });
    return pets;
  }

}
