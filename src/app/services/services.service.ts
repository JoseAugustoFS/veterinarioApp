import { Injectable } from '@angular/core';
import { Pool, neon } from "@neondatabase/serverless";
import { IService } from '../interfaces/iservice';
import { Service } from '../models/service.model';

const sql = neon(import.meta.env.DATABASE_URL);

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor() { }

  public async getAllServices(): Promise<IService[]> {
    const data = await sql`SELECT * FROM services;`;

    const services: IService[] = data.map((serviceData: any) => {
      return new Service(serviceData.id, serviceData.type, serviceData.description, new Date(serviceData.date), serviceData.petid, serviceData.petname, serviceData.petowner)
    });

    return services;
  }

  public async addService(service: IService): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `INSERT INTO services (type, description, date, petId, petName, petOwner) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [service.type, service.description, new Date(service.date), service.petId, service.petName, service.petOwner]
    );
    pool.end();
  }

  public async updateService(serviceId: number, description: string): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `UPDATE services SET description = $1 WHERE id = $2`,
      [description, serviceId]
    );
    pool.end();
  }


  public async deleteService(id: number): Promise<void> {
    const pool = new Pool({ connectionString: import.meta.env.DATABASE_URL });
    const data = await pool.query(
      `DELETE FROM services WHERE id = $1`,
      [id]
    );
    pool.end();
  }

  public async searchService(filter: {petName: string, petOwner: string, type: string, description: string, firstDate: string, lastDate: string}): Promise<IService[]> {
      const data = await sql`
        SELECT * FROM services 
        WHERE LOWER(petname) LIKE ${'%' + filter.petName.toLowerCase() + '%'} 
        AND LOWER(petowner) LIKE ${'%' + filter.petOwner.toLowerCase() + '%'} 
        AND LOWER(type) LIKE ${'%' + filter.type.toLowerCase() + '%'} 
        AND LOWER(description) LIKE ${'%' + filter.description.toLowerCase() + '%'} 
        AND date BETWEEN ${filter.firstDate} AND ${filter.lastDate};
      `;
      const services: IService[] = data.map((serviceData: any) => {
        return new Service(serviceData.id, serviceData.type, serviceData.description, new Date(serviceData.date), serviceData.petid, serviceData.petname, serviceData.petowner)
      });
      return services;
    }

}
