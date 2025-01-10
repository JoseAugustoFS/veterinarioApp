import { Component, inject } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { IPet } from '../../models/interfaces/IPet.interface';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DeletePetComponent } from './delete-pet/delete-pet.component';

@Component({
  selector: 'app-pets-manager',
  imports: [MatDialogModule],
  templateUrl: './pets-manager.component.html',
  styleUrl: './pets-manager.component.css',
  
})
export class PetsManagerComponent {

  readonly dialogAddPet = inject(MatDialog);
  readonly dialogEditPet = inject(MatDialog);
  readonly dialogDeletePet = inject(MatDialog);
  
  public pets: Array<IPet> = [
      new Pet(
        1,
        'Rex',
        'M',
        'dog',
        new Date('2016-01-01'),
        'João',
        'Pastor Alemão',
        12
      ),
      new Pet(
        2,
        'Tom',
        'F',
        'cat',
        new Date('2014-01-01'),
        'Lucas',
        'SRD',
        3
      ),
      new Pet(
        3,
        'Bella',
        'F',
        'dog',
        new Date('2018-01-01'),
        'Maria',
        'Labrador',
        20
      ),
      new Pet(
        4,
        'Max',
        'M',
        'dog',
        new Date('2017-01-01'),
        'Carlos',
        'Bulldog',
        18
      ),
      new Pet(
        5,
        'Luna',
        'F',
        'cat',
        new Date('2019-01-01'),
        'Ana',
        'Persian',
        4
      ),
      new Pet(
        6,
        'Charlie',
        'M',
        'dog',
        new Date('2015-01-01'),
        'Pedro',
        'Beagle',
        10
      ),
      new Pet(
        7,
        'Milo',
        'M',
        'cat',
        new Date('2020-01-01'),
        'Fernanda',
        'Siamese',
        3
      ),
      new Pet(
        8,
        'Lucy',
        'F',
        'dog',
        new Date('2016-01-01'),
        'Roberto',
        'Poodle',
        8
      ),
      new Pet(
        9,
        'Simba',
        'M',
        'cat',
        new Date('2017-01-01'),
        'Juliana',
        'Maine Coon',
        6
      )
  ]

  public getPetAge(pet: IPet): string{
    return pet.getAge();
  }
  
  public addPet(): void {
    const dialogRef = this.dialogAddPet.open(AddPetComponent, {
      width: '400px',
      height: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pets.push(new Pet(this.pets[this.pets.length-1].id+1, result.name, result.gender, result.type, new Date(result.dateBirth), result.owner, result.race, result.weight));
      }
    });
  }

  public editPet(pet: IPet): void {
    const dialogRef = this.dialogEditPet.open(EditPetComponent, {
      width: '400px',
      height: '650px',
      data: pet
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.pets.map((petIterator) => {
          petIterator.id === result.id ? 
          this.pets[petIterator.id-1] = new Pet(result.id, result.name, result.gender, result.type, new Date(result.dateBirth), result.owner, result.race, result.weight) : 
          petIterator;
        });  
      }
    });
  }


  public deletePet(pet: IPet): void {
    const dialogRef = this.dialogDeletePet.open(DeletePetComponent, {
      width: '300px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pets = this.pets.filter(p => p.id !== pet.id);
      }
    });
  }

  public getImage (type: string): string {
    return `../../../assets/svg/${type}.svg`;
  }

}
