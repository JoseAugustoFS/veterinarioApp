import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { IPet } from '../../models/interfaces/IPet.interface';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DeletePetComponent } from './delete-pet/delete-pet.component';
import { PetsService } from '../../services/pets.service';
import { LoadingBoxComponent } from '../loading-box/loading-box.component';

@Component({
  selector: 'app-pets-manager',
  imports: [MatDialogModule],
  templateUrl: './pets-manager.component.html',
  styleUrl: './pets-manager.component.css',
  
})
export class PetsManagerComponent implements OnInit {
  
  readonly dialogAddPet = inject(MatDialog);
  readonly dialogEditPet = inject(MatDialog);
  readonly dialogDeletePet = inject(MatDialog);
  readonly dialogLoading = inject(MatDialog);
  private PetsService = inject(PetsService);
  public pets: Pet[] | null = null;

  ngOnInit(): void {
    this.loadPets();
  }
  
  private async loadPets(): Promise<void> {
    this.pets = await this.PetsService.getAllPets();
    this.pets.sort((a, b) => a.id - b.id);
  }

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
        this.loadingBox();
        this.PetsService.addPet(new Pet(0, result.name, result.gender, result.type, new Date(result.dateBirth), result.owner, result.race, result.weight)).then(() => {
          this.loadPets();
          this.dialogLoading.closeAll();
        });
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
      if(result) {
        this.loadingBox();
        this.PetsService.updatePet(result as IPet).then(() => {
          this.loadPets();
          this.dialogLoading.closeAll();
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
        this.loadingBox();
        this.PetsService.deletePet(pet.id).then(() => {
            this.loadPets();
            this.dialogLoading.closeAll();
        })
      }
    });
  }

  public getImage (type: string): string {
    return `../../../assets/svg/${type}.svg`;
  }

  public loadingBox(): void{
    const dialogRef = this.dialogLoading.open(LoadingBoxComponent, {
      width: '400px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }


}
