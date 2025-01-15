import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateValidator } from '../../../shared/DateValidator';
import { IPet } from '../../../interfaces/IPet.interface';
import { DatePipe } from '@angular/common';
import { PetsService } from '../../../services/pets.service';

@Component({
  selector: 'app-edit-pet',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.css'
})
export class EditPetComponent {

  private dialogRef = inject(MatDialogRef<EditPetComponent>);
  private PetsService = inject(PetsService)
  public pet = inject<IPet>(MAT_DIALOG_DATA);
  public editPetForm: FormGroup;
  public repeatedName: boolean = false;

  constructor(private fb: FormBuilder, private datepipe: DatePipe) {
    this.editPetForm = this.fb.group({
      id: [this.pet.id],
      name: [this.pet.name, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      gender: [this.pet.gender, [Validators.required, Validators.pattern(/^(M|F)$/)]],
      type: [this.pet.type, [Validators.required,, Validators.pattern(/^(dog|cat|rabbit|bird|fish|reptile)$/)]],
      dateBirth: [this.datepipe.transform(this.pet.dateBirth, 'yyyy-MM-dd'), [Validators.required, DateValidator()]],
      owner: [this.pet.owner, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      race: [this.pet.race, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      weight: [this.pet.weight, [Validators.required, Validators.min(0.1), Validators.max(100)]]
    });
  }

  onSubmit() {
    this.checkRepeatedName().then(() => {
      if (this.editPetForm.valid && !this.repeatedName) {
        this.dialogRef.close(this.editPetForm.value);
      }
    });
    
  }

  public async checkRepeatedName(): Promise<void> {
    let pets: IPet[] = await this.PetsService.getPetsByOwner(this.editPetForm.value.owner);
    pets=pets.filter(pet => pet.name!==this.pet.name);
    this.repeatedName = pets.some(pet => pet.name===this.editPetForm.value.name);
  }

}
