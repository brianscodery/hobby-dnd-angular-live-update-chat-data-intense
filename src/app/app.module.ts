import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { RuleRemindersComponent } from './components/rule-reminders/rule-reminders.component';
import { SVGDieComponent } from './components/svgdie/svgdie.component';
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
    SVGDieComponent,
    ChatComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    CoreModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
