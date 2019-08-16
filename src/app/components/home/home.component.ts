import { CharacterService } from './../../services/character.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(public characterService: CharacterService) {}

  ngOnInit() {
  }

  public executeSelectedChange = event => {
    console.log(event);
  }
}
