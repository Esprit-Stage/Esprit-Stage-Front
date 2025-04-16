import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { PostComponent } from './component/post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      
      { path: 'add-posts', component: PostComponent },
      { path: 'posts', component: PostListComponent },
      { path: 'edit/:id', component: EditPostComponent }, // Page de modification
      { path: 'posts/:id', component: PostDetailsComponent }, // Route pour voir les détails d'un post
      { path: '', component: PostListComponent },
      { path: 'post-details/:postId', component: PostDetailsComponent } ,
      // Route par défaut (liste des posts)
      { path: 'admin/dashboard', component: DashboardAdminComponent },


    ]
  },
  {
    path: '**',
    redirectTo: '/add-posts'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
