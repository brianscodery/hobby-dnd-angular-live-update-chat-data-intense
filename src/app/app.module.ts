import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { FirebaseModule } from './modules/firebase.module';
import {HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { RuleRemindersComponent } from './components/rule-reminders/rule-reminders.component';
import { ModifierPipe } from './pipes/modifier.pipe';
import { SVGDieComponent } from './components/svgdie/svgdie.component';
import { UnCamelCasePipe } from './pipes/un-camel-case.pipe';
import { DiePipe } from './pipes/die.pipe';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    CharacterSheetComponent,
    RuleRemindersComponent,
    ModifierPipe,
    SVGDieComponent,
    UnCamelCasePipe,
    DiePipe,
    ChatComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    FirebaseModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot( environment.firebase  ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
