import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayoutComponent),
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
]

