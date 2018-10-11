import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AuthInterceptor } from './interceptors/authInterceptor';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ResponseInterceptor } from './interceptors/responseInterceptor';
import { VillesComponent } from './villes/villes.component';
import { SitesComponent } from './sites/sites.component';
import { VilleService } from './services/ville.service';
import { SortieService } from './services/sortie.service';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AccueilComponent},
  { path: 'accueil',  canActivate: [AuthGuard], component: AccueilComponent},
  { path: 'auth', component: ConnexionComponent},
  { path: 'monprofil', canActivate: [AuthGuard], component: MonProfilComponent},
  { path: 'creersortie', canActivate: [AuthGuard], component: CreationSortieComponent},
  { path: 'villes', canActivate: [AuthGuard], component: VillesComponent },
  { path: 'sites', canActivate: [AuthGuard], component: SitesComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ConnexionComponent,
    AccueilComponent,
    MonProfilComponent,
    ProfilComponent,
    CreationSortieComponent,
    VillesComponent,
    SitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [
    ConnexionService,
    AuthGuard,
    SiteService,
    ParticipantService,
    VilleService,
    SortieService,
    ToasterService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
