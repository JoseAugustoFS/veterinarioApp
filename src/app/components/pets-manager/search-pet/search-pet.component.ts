import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() filter = new EventEmitter<{name: string, gender: string, type: string, owner: string, race: string, firstDate: string, lastDate: string, minWeight:number, maxWeight: number}>();

  constructor(private fb: FormBuilder) {
    this.searchPetForm = this.fb.group({
      name: [''],
      gender: ['', [Validators.pattern(/^(M|F)$/)]],
      type: ['', [Validators.pattern(/^(dog|cat|rabbit|bird|fish|reptile)$/)]],
      owner: [''],
      race: [''],
      firstDate: [''],
      lastDate: [''],
      minWeight: [0.1, [Validators.min(0.1), Validators.max(100)]],
      maxWeight: [100, [Validators.min(0.1), Validators.max(100)]]
    });
  }

  onSubmit() {
     if (this.searchPetForm.valid && this.isDateValid()) {
      this.filter.emit(this.searchPetForm.value);
    }
  }

  public isDateValid(): boolean{
    if(this.searchPetForm.value.firstDate && this.searchPetForm.value.lastDate){
      return this.searchPetForm.value.firstDate < this.searchPetForm.value.lastDate
    }
    this.searchPetForm.value.firstDate = this.searchPetForm.value.firstDate ? this.searchPetForm.value.firstDate : '1950-01-01'
    this.searchPetForm.value.lastDate = this.searchPetForm.value.lastDate ? this.searchPetForm.value.lastDate : new Date().toISOString().split('T')[0]
    return true;
  }

  public clearFilter():void {
    this.searchPetForm.reset({
      name: '',
      gender: '',
      type: '',
      owner: '',
      race: '',
      firstDate: '',
      lastDate: '',
      minWeight: 0.1,
      maxWeight: 100
    });
  }

}
