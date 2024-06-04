import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { VotesMixtaComponent } from './components/votes-mixta/votes-mixta.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'votos' },
    { path: 'login', component: LoginComponent },
    {
        path: 'votos',
        loadChildren: () => import('./components/component.routes').then(m => m.COMPONENT_ROUTES)
    },
    { path: 'votaciones', component: VotesMixtaComponent },
];
