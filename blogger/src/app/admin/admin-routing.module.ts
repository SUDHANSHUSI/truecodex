import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';

import { AuthGuard } from '../auth/auth.guard';
import { BlogFormComponent } from './blog-form/blog-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'blogs', component: ManageBlogsComponent },
          { path: 'categories', component: ManageCategoriesComponent },
          { path: 'pages', component: ManagePagesComponent },
          { path: '', component: AdminDashboardComponent },
          { path: 'blogs/create', component: BlogFormComponent },
          { path: 'blogs/edit/:id', component: BlogFormComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
