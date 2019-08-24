import { Character, SpokenLanguage } from '../../shared/common-interfaces-and-types';
import { Message, ChatService } from '../../core/chat.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { firestore } from 'firebase';
import isSameDay from 'date-fns/is_same_day';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component( {
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
} )
export class ChatComponent implements OnInit, AfterViewInit {
  isSameDay = isSameDay;
  @Input() character: Character;
  @ViewChild( 'scrollMe', { static: false } ) private myScrollContainer: ElementRef;
  @ViewChild( 'messageInput', { static: false } ) messageInputRef: ElementRef;
  messages$: Observable<Message[]>;
  currentChatMembers = [ { name: 'tonitrus' }, { name: 'js' } ];
  currentLanguage: SpokenLanguage = 'common';

  constructor ( public chatService: ChatService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.messages$ = this.chatService.getChatMessages( this.currentChatMembers );
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.scrollToBottom() ,1000);
  }

  async addMessage( event?: KeyboardEvent ) {
    const timestamp = firestore.Timestamp.fromDate( new Date() );
    const message: string = this.messageInputRef.nativeElement.value;
    if ( !message ) { return; }
    if ( event && event.key !== 'Enter' ) { return; }
    const from = this.character.name;
    await this.chatService.addMessage( this.currentChatMembers, message, timestamp, from, this.currentLanguage ).then( () => {
      this.messageInputRef.nativeElement.value = '';
    } ).catch( error => {
      const errorMessage = `There was an error sending your message
        error: ${error }
        Please try again`;
      const snackBarRef = this._snackBar.open( errorMessage, 'Ok', { duration: 2500 } );
      snackBarRef
        .afterDismissed()
        .subscribe( () => {
          console.log( 'snack-bar dismissed' );
        } );
      snackBarRef.dismiss();
    } ); 
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      console.log( 'called' );
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

    } catch ( err ) { }
  }
  openSnackBar( message: string, action: string ) {
    this._snackBar.open( message, action, {
      duration: 2000,
    } );
  }
}
