import { Routes } from '@angular/router';
import { VotesAdminComponent } from './votes-admin/votes-admin.component';
import { VotesMixtaDetailComponent } from './votes-mixta/votes-mixta-detail/votes-mixta-detail.component';
import { VotesMixtaComponent } from './votes-mixta/votes-mixta.component';
import { ViewResultComponent } from './votes-mixta/view-result/view-result.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';

export const COMPONENT_ROUTES: Routes = [
    {
        path: '',
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
    }
]