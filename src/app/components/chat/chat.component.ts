import { Character } from './../../interfaces/character';
import { Message, ChatService } from './../../services/chat.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { firestore } from 'firebase';

@Component( {
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() character: Character;
  messages$: Observable<Message[]>;
  currentChatMembers = [ { name: 'tonitrus' }, { name: 'js' } ];

  constructor ( public chatService: ChatService) { }

  ngOnInit(  ) {
    this.messages$ = this.chatService.getChatMessages(this.currentChatMembers );
  }

  addMessage( event ) {
    const timestamp = firestore.Timestamp.fromDate( new Date() );
    const message = event.target.value;
    const from = this.character.name;
    event.target.value = '';
    this.chatService.addMessage( this.currentChatMembers, message, timestamp, from );
  }

}
