import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { perfilResolver } from './services/user.service';

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
                canActivate: [AuthGuard(['admin', 'rrhh', 'lider', 'comun'])],
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
            },
            {
                path: 'legajo/:id',
                canActivate: [AuthGuard(['admin', 'rrhh', 'lider', 'comun'])],
                loadComponent: () => import('./pages/legajo/legajo').then(m => m.Legajo),
                resolve: {
                   perfil: perfilResolver
                }
            },
            {
                path: 'equipo',
                canActivate: [AuthGuard(['admin', 'rrhh', 'lider', 'comun'])],
                loadComponent: () => import('./pages/equipo/equipo').then(m => m.Equipo),
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
]

