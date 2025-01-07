import { Component } from '@angular/core';
import { IPet } from '../../models/interfaces/IPet.interface';

@Component({
  selector: 'app-pets-manager',
  imports: [],
  templateUrl: './pets-manager.component.html',
  styleUrl: './pets-manager.component.css'
})
export class PetsManagerComponent {

  public pets: Array<IPet> = [
    {
      id: 1,
      name: 'Rex',
      gender: 'M',
      type: 'dog',
      age: 5,
      owner: 'João',
      race: 'Pastor Alemão',
      weight: 12
    },
    {
      id: 2,
      name: 'Tom',
      gender: 'F',
      type: 'cat',
      age: 7,
      owner: 'Lucas',
      race: 'SRD',
      weight: 3
    },
  {
    id: 3,
    name: 'Bella',
    gender: 'F',
    type: 'dog',
    age: 3,
    owner: 'Maria',
    race: 'Labrador',
    weight: 20
  },
  {
    id: 4,
    name: 'Max',
    gender: 'M',
    type: 'dog',
    age: 4,
    owner: 'Carlos',
    race: 'Bulldog',
    weight: 18
  },
  {
    id: 5,
    name: 'Luna',
    gender: 'F',
    type: 'cat',
    age: 2,
    owner: 'Ana',
    race: 'Persian',
    weight: 4
  },
  {
    id: 6,
    name: 'Charlie',
    gender: 'M',
    type: 'dog',
    age: 6,
    owner: 'Pedro',
    race: 'Beagle',
    weight: 10
  },
  {
    id: 7,
    name: 'Milo',
    gender: 'M',
    type: 'cat',
    age: 1,
    owner: 'Fernanda',
    race: 'Siamese',
    weight: 3
  },
  {
    id: 8,
    name: 'Lucy',
    gender: 'F',
    type: 'dog',
    age: 5,
    owner: 'Roberto',
    race: 'Poodle',
    weight: 8
  },
  {
    id: 9,
    name: 'Simba',
    gender: 'M',
    type: 'cat',
    age: 4,
    owner: 'Juliana',
    race: 'Maine Coon',
    weight: 6
  }
  ]

  public editPet(pet: IPet): void {
    
  }

  public deletePet(pet: IPet): void {
    
  }

  public getImage (type: string): string {
    return `../../../assets/svg/${type}.svg`;
  }

}
