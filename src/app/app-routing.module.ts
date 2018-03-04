import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWithRequestComponent} from './pay-with-request/pay-with-request.component';
import { ContactComponent} from './contact/contact.component';

const routes: Routes = [{
    path: '',
    loadChildren: './invoices/invoices.module#InvoicesModule',
    // data: { preload: true }
  },
  {
    path: 'pay-with-request',
    component: PayWithRequestComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
