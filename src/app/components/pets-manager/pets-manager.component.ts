import { Component, inject } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { IPet } from '../../models/interfaces/IPet.interface';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from './add-pet/add-pet.component';

@Component({
  selector: 'app-pets-manager',
  imports: [MatDialogModule],
  templateUrl: './pets-manager.component.html',
  styleUrl: './pets-manager.component.css'
})
export class PetsManagerComponent {

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPetComponent, {
      width: '400px',
      height: '650px',
      panelClass: 'modal',
      data: {name: 'teste'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

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

  public editPet(pet: IPet): void {
    
  }

  public deletePet(pet: IPet): void {
    
  }

  public getImage (type: string): string {
    return `../../../assets/svg/${type}.svg`;
  }

}
