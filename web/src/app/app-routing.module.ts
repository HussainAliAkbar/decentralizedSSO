import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBlockchainComponent } from './components/register-blockchain/register-blockchain.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        children: [
            { path: 'service', component: RegisterBlockchainComponent },
            { path: 'consumer', component: RegisterBlockchainComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
