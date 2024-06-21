import { Routes } from '@angular/router';
import { VotesAdminComponent } from './votes-admin/votes-admin.component';
import { VotesMixtaDetailComponent } from './votes-mixta/votes-mixta-detail/votes-mixta-detail.component';
import { VotesMixtaComponent } from './votes-mixta/votes-mixta.component';
import { ViewResultComponent } from './votes-mixta/view-result/view-result.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DelegatesComponent } from './delegates/delegates.component';

export const COMPONENT_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'votos',
                component: VotesAdminComponent
            },
            {
                path: 'detalle',
                component: VoteDetailComponent
            },
            {
                path: 'resultados',
                component: ViewResultComponent,
            },
            {
                path: 'detalle-mixto',
                component: VotesMixtaDetailComponent
            },
            { path: 'votaciones', component: VotesMixtaComponent },
            { path: 'delegados', component: DelegatesComponent },
        ]
    }
]