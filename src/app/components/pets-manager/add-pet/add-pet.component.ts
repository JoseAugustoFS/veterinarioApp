import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-add-pet',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})
export class AddPetComponent {

  addPetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addPetForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      type: ['', Validators.required],
      dateBirth: ['', Validators.required],
      owner: ['', Validators.required],
      race: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addPetForm.valid) {
      console.log(this.addPetForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
