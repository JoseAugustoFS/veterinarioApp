import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-pet',
  imports: [ReactiveFormsModule],
  templateUrl: './search-pet.component.html',
  styleUrl: './search-pet.component.css'
})
export class SearchPetComponent {

  public searchPetForm: FormGroup;
  public repeatedName: boolean = false;

  constructor(private fb: FormBuilder) {
    this.searchPetForm = this.fb.group({
      name: [''],
      gender: ['', [Validators.pattern(/^(M|F)$/)]],
      type: ['', [Validators.pattern(/^(dog|cat|rabbit|bird|fish|reptile)$/)]],
      dateBirth: [''],
      owner: [''],
      race: [''],
      weight: ['']
    });
  }

  onSubmit() {
    if (this.searchPetForm.valid) {

    }
  }

}
