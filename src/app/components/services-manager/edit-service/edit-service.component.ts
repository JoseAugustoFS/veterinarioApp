import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IService } from '../../../interfaces/iservice';

@Component({
  selector: 'app-edit-service',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {

  private dialogRef = inject(MatDialogRef<EditServiceComponent>);
  public service = inject<IService>(MAT_DIALOG_DATA);
  public editServiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editServiceForm = this.fb.group({
      description: [this.service.description, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    });
  }

  onSubmit() {
      if (this.editServiceForm.valid) {
        this.dialogRef.close(this.editServiceForm.value.description);
      }
  }

}
