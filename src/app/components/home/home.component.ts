import { CharacterService } from '../../core/character.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(public characterService: CharacterService, public afAuth: AngularFireAuth) {}

  ngOnInit() {
  }

  public executeSelectedChange = event => {
    console.log(event);
  }
}
