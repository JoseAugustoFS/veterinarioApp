import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pet',
  imports: [MatDialogModule],
  templateUrl: './delete-pet.component.html',
  styleUrl: './delete-pet.component.css'
})
export class DeletePetComponent {
  private dialogRef = inject(MatDialogRef<DeletePetComponent>);

  public confirm() {
     this.dialogRef.close(true);
  }
}
