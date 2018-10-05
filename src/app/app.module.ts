import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu-component/top-menu-component.component';
import { ConnexionComponent } from './connexion-component/connexion-component.component';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component.component';
import { ConnexionService } from './services/connexion.service';
import { AuthGuard } from './services/auth-guard.service';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { SiteService } from './services/site.service';
import { ParticipantService } from './services/participant.service';
import { ProfilComponent } from './profil/profil.component';
import { CreationSortieComponent } from './creation-sortie/creation-sortie.component';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AccueilComponent},
  { path: 'accueil',  canActivate: [AuthGuard], component: AccueilComponent},
  { path: 'auth', component: ConnexionComponent},
  { path: 'monprofil', canActivate: [AuthGuard], component: MonProfilComponent},
  { path: 'creersortie', canActivate: [AuthGuard], component: CreationSortieComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ConnexionComponent,
    AccueilComponent,
    MonProfilComponent,
    ProfilComponent,
    CreationSortieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ConnexionService,
    AuthGuard,
    SiteService,
    ParticipantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
