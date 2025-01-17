import { Component, inject, OnInit } from '@angular/core';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LoadingBoxComponent } from '../loading-box/loading-box.component';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';
import { IService } from '../../interfaces/iservice';
import { DatePipe } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
import { PetsService } from '../../services/pets.service';
import { SearchServiceComponent } from './search-service/search-service.component';

@Component({
  selector: 'app-services-manager',
  imports: [MatDialogModule, DatePipe, SearchServiceComponent],
  templateUrl: './services-manager.component.html',
  styleUrl: './services-manager.component.css'
})
export class ServicesManagerComponent implements OnInit {

  readonly dialogAddService = inject(MatDialog);
  readonly dialogEditService = inject(MatDialog);
  readonly dialogDeleteService = inject(MatDialog);
  readonly dialogLoading = inject(MatDialog);

  private ServicesService = inject(ServicesService);
  private PetsService = inject(PetsService);

  public services: Service[] | null = null;
  public hasPets?: boolean

  async ngOnInit(): Promise<void> {
    this.loadServices();
    this.hasPets = await this.checkAmountPets().then(res => {return res;});
  }

  private async checkAmountPets(): Promise<boolean> {
    return this.PetsService.getAllPets().then(pets => {
      return pets.length ? true : false;
    });
  }


  private async loadServices(): Promise<void> {
    this.services = await this.ServicesService.getAllServices();
    this.services.sort((a, b) => a.id - b.id);
  }


  public addService(): void {
    const dialogRef = this.dialogAddService.open(AddServiceComponent, {
      width: '400px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingBox();
        this.ServicesService.addService(result).then(() => {
          this.loadServices();
          this.dialogLoading.closeAll();
        });
      }
    });
  }

  public editService(service: IService): void {
    const dialogRef = this.dialogEditService.open(EditServiceComponent, {
      width: '320px',
      height: '280px',
      data: service
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingBox();
        this.ServicesService.updateService(service.id, result).then(() => {
          this.loadServices();
          this.dialogLoading.closeAll();
        });
      }
    });
  }

  public deleteService(service: IService): void {
    const dialogRef = this.dialogDeleteService.open(DeleteServiceComponent, {
      width: '300px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingBox();
        this.ServicesService.deleteService(service.id).then(() => {
          this.loadServices();
          this.dialogLoading.closeAll();
        })
      }
    });
  }

  public getImage(type: string): string {
    return `../../../assets/svg/${type}.svg`;
  }

  public loadingBox(): void {
    const dialogRef = this.dialogLoading.open(LoadingBoxComponent, {
      width: '400px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  public filterService(filter: {petName: string, petOwner: string, type: string, description: string, firstDate: string, lastDate: string}){
    this.ServicesService.searchService(filter).then((res) => {
      this.services = res;
      this.services.sort((a, b) => a.id - b.id);
    });
  }

}
