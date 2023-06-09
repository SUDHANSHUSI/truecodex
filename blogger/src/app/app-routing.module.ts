import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { BlogpostRoutingModule } from './blogpost/blogpost-routing.module';
import { CmspageRoutingModule } from './cmspage/cmspage-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule,BlogpostRoutingModule,CmspageRoutingModule,AdminRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
