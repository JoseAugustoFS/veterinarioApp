import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-service',
  imports: [MatDialogModule],
  templateUrl: './delete-service.component.html',
  styleUrl: './delete-service.component.css'
})
export class DeleteServiceComponent {

  private dialogRef = inject(MatDialogRef<DeleteServiceComponent>);

  public confirm() {
    this.dialogRef.close(true);
  }

}
