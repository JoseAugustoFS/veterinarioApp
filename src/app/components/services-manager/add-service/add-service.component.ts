import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PetsService } from '../../../services/pets.service';
import { IPet } from '../../../interfaces/IPet.interface';
import { IService } from '../../../interfaces/iservice';

@Component({
  selector: 'app-add-service',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  readonly dialogRef = inject(MatDialogRef<AddServiceComponent>);
  private PetsService = inject(PetsService)

  public addServiceForm: FormGroup;
  public owners: string[] = [];
  public petsOwners: IPet[] = [];
  public petChoose?: IPet;

  constructor(private fb: FormBuilder) {
    this.addServiceForm = this.fb.group({
      petOwner: ['', [Validators.required, Validators.pattern(new RegExp(this.owners.join('|')))]],
      petName: ['', [Validators.required, Validators.pattern(new RegExp(this.petsOwners.join('|')))]],
      type: ['', [Validators.required, Validators.pattern(/^(consult|surgery|vaccine|bath|grooming)$/)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    });
    this.getOwners();
  }

  public async getOwners(): Promise<void>{
    this.owners = await this.PetsService.getAllOwners().then(res => {return res;})
  }


  public async getPetsOfOwners(): Promise<void>{
    this.petsOwners = await this.PetsService.getPetsByOwner(this.addServiceForm.value.petOwner).then(res => {return res;});
    this.addServiceForm.patchValue({
      petName: '',
      type: ''
    });
  }

  public choosePet(): void{
    this.petChoose=this.petsOwners.find((pet) => pet.name===this.addServiceForm.value.petName);
    setTimeout(() => {
      this.addServiceForm.patchValue({ type: '' });
    },1);
  }
  

  public onSubmit() {
    this.addServiceForm.markAllAsTouched();
    if (this.addServiceForm.valid && this.petChoose) {
      let service: IService = {
        id: 0,
        type: this.addServiceForm.value.type,
        description: this.addServiceForm.value.description,
        date: new Date(),
        petId: this.petChoose.id,
        petName: this.petChoose.name,
        petOwner: this.addServiceForm.value.petOwner
      }
      this.dialogRef.close(service);
    }
  }
}
