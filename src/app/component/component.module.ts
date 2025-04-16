import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CommentaireComponent } from '../commentaire/commentaire.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { PostListComponent } from '../post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { NgChartsModule } from 'ng2-charts';  // Assurez-vous d'ajouter ng2-charts pour les graphiques

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule,  // Ajout du module ng2-charts pour les graphiques
    // Autres imports pour les composants supplémentaires
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    CardsComponent,
    TableComponent
  ],
  declarations: [
    DashboardAdminComponent,
    PostComponent,
    PostListComponent,
    EditPostComponent,
    PostDetailsComponent,
    CommentaireComponent
  ],
  exports: [  // Si tu veux exposer ces composants à d'autres modules
    DashboardAdminComponent,
    PostComponent,
    PostListComponent,
    EditPostComponent,
    PostDetailsComponent,
    CommentaireComponent
  ]
})
export class ComponentsModule { }
