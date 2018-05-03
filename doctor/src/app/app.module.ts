import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { GuardiansComponent } from './guardians/guardians.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkersComponent } from './workers/workers.component';
import { ApiService } from './api.service';


//extenals
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationsComponent } from './conversations/conversations.component';




let ROUTES =[
  {path:'', redirectTo:'landing', pathMatch:'full'},
  {path:'landing', component:LandingComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent, children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'vaccines', component:VaccinesComponent},
    {path:'doctors', component:DoctorsComponent},
    {path:'guardians', component:GuardiansComponent},
    {path:'guardians/:id', component:GuardiansComponent},
    {path:'workers', component:WorkersComponent},
    {path:'notifications', component:NotificationsComponent},
    {path:'messages/:id', component:MessagesComponent},
    {path:'conversations', component:ConversationsComponent},

  ]},
  


]

let firebaseConfig= {
  apiKey: "AIzaSyB529CKeEX6S_wTIGCdxpnvfK0v4x0Z7VQ",
  authDomain: "polio-management.firebaseapp.com",
  databaseURL: "https://polio-management.firebaseio.com",
  projectId: "polio-management",
  storageBucket: "",
  messagingSenderId: "689787945890"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    VaccinesComponent,
    DoctorsComponent,
    GuardiansComponent,
    LandingComponent,
    FooterComponent,
    ProfileComponent,
    WorkersComponent,
    NotificationsComponent,
    MessagesComponent,
    ConversationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    OrderModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
