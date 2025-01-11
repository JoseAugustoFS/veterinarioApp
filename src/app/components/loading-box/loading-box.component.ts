import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-box',
  imports: [MatDialogModule],
  templateUrl: './loading-box.component.html',
  styleUrl: './loading-box.component.css'
})
export class LoadingBoxComponent {

  private dialogRef = inject(MatDialogRef<LoadingBoxComponent>);

  public confirm() {
    this.dialogRef.close(true);
  }

}
