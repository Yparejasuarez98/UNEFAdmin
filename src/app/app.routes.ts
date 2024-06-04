import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadChildren: () => import('./auth/login/login.routes').then(m => m.LOGIN_ROUTES) },
    { path: '', loadChildren: () => import('./components/component.routes').then(m => m.COMPONENT_ROUTES)},
];
