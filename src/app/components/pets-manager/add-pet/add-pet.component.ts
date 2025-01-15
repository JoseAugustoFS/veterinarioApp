import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DateValidator } from '../../../shared/DateValidator';
import { PetsService } from '../../../services/pets.service';
import { IPet } from '../../../interfaces/IPet.interface';



@Component({
  selector: 'app-add-pet',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})
export class AddPetComponent {
  readonly dialogRef = inject(MatDialogRef<AddPetComponent>);
  private PetsService = inject(PetsService)

  public addPetForm: FormGroup;
  public repeatedName: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addPetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      gender: ['', [Validators.required, Validators.pattern(/^(M|F)$/)]],
      type: ['', [Validators.required, Validators.pattern(/^(dog|cat|rabbit|bird|fish|reptile)$/)]],
      dateBirth: ['', [Validators.required, DateValidator()]],
      owner: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      race: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      weight: ['', [Validators.required, Validators.min(0.1), Validators.max(100)]]
    });
  }

  onSubmit() {
    this.addPetForm.markAllAsTouched();
    this.checkRepeatedName().then(() => {
      if (this.addPetForm.valid && !this.repeatedName) {
        this.dialogRef.close(this.addPetForm.value);
      }
    });
  }

  public async checkRepeatedName(): Promise<void> {
    let pets: IPet[] = await this.PetsService.getPetsByOwner(this.addPetForm.value.owner);
    this.repeatedName = pets.some(pet => pet.name===this.addPetForm.value.name);
  }

}
