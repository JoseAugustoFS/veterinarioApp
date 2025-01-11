import { Injectable } from '@angular/core';
import { Pool, neon } from "@neondatabase/serverless";
import { IPet } from '../models/interfaces/IPet.interface';
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

}
