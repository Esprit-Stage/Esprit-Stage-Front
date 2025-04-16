import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

// Importation des composants standalone
import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';

// ❌ Supprimer les déclarations directes ici si elles sont déjà dans un ComponentModule

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    // Les autres composants (FullComponent, NavigationComponent, SidebarComponent) ne sont pas dans declarations
    // Car ils sont déjà des composants standalone importés directement
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgChartsModule,
    RouterModule.forRoot(Approutes, { useHash: false }),

    // ✅ Importation de ComponentsModule qui inclut déjà tous les composants nécessaires comme PostComponent, etc.
    // ComponentsModule est déjà bien configuré dans ton projet
    // ComponentsModule 
    FullComponent,
    NavigationComponent,
    SidebarComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
