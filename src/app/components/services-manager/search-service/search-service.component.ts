import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-service',
  imports: [ReactiveFormsModule],
  templateUrl: './search-service.component.html',
  styleUrl: './search-service.component.css'
})
export class SearchServiceComponent {

  public searchServiceForm: FormGroup;
    public repeatedName: boolean = false;
    @Output() filter = new EventEmitter<{petName: string, petOwner: string, type: string, description: string, firstDate: string, lastDate: string}>();
  
    constructor(private fb: FormBuilder) {
      this.searchServiceForm = this.fb.group({
        petName: [''],
        petOwner: [''],
        type: ['', [Validators.pattern(/^(consult|surgery|vaccine|bath|grooming)$/)]],
        description: [''],
        firstDate: [''],
        lastDate: [''],
      });
    }
  
    onSubmit() {
       if (this.searchServiceForm.valid && this.isDateValid()) {
        this.filter.emit(this.searchServiceForm.value);
      }
    }
  
    public isDateValid(): boolean{
      if(this.searchServiceForm.value.firstDate && this.searchServiceForm.value.lastDate){
        return this.searchServiceForm.value.firstDate <= this.searchServiceForm.value.lastDate
      }
      this.searchServiceForm.value.firstDate = this.searchServiceForm.value.firstDate ? this.searchServiceForm.value.firstDate : '1950-01-01'
      this.searchServiceForm.value.lastDate = this.searchServiceForm.value.lastDate ? this.searchServiceForm.value.lastDate : new Date().toISOString().split('T')[0]
      return true;
    }
  
    public clearFilter():void {
      this.searchServiceForm.reset({
        petName: '',
        petOwner: '',
        type: '',
        description: '',
        firstDate: '',
        lastDate: '',
      });
    }

}
