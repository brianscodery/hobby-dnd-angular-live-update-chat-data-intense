import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { LinkMenuItem, AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app'
import { SpellService } from './services/apis/spell.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dnd';
  links: LinkMenuItem[];
  themes= Theme;

  ngOnInit(): void {
    // this.links = [
    //   { icon: 'home', text: 'Home', callback: this.printLog },
    //   { icon: 'favorite', text: 'Favorite', callback: this.printLog },
    //   { icon: 'add', text: 'Add', callback: this.printLog },
    // ];
    // this.spellService.addSpellsToDB();
  }

  constructor(public afAuth: AngularFireAuth, public spellService: SpellService){}
  printUser( event ) {
    console.log( event );
  }

  printError( event ) {
    console.error( event );
  }
}
