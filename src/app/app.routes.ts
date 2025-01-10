import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetsManagerComponent } from './components/pets-manager/pets-manager.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'pets',
        component: PetsManagerComponent,
    },
    {
        path: '**', 
        redirectTo: ''
    },
];
