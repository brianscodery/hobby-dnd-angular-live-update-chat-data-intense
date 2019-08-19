import { Character } from './../interfaces/character';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;
import { map } from 'rxjs/operators';

export interface Message {
  from: string;
  content: string;
  timestamp: Timestamp;
}

@Injectable( {
  providedIn: 'root'
} )
export class ChatService {

  constructor ( public afs: AngularFirestore ) { }

  getChatMessages( characters: Character[] ): Observable<Message[]> {
    const chatGroupName = this.getChatGroupName( characters );
    return this.afs.collection( 'chats' ).doc( chatGroupName ).collection<Message>( 'messages' ).valueChanges()
      .pipe(
      map(
      messages => {
        messages.sort( ( messageA, messageB ) => {
          const timestampA: Timestamp = messageA.timestamp;
          const timeA = timestampA.toDate().getTime();
          const timestampB: Timestamp = messageB.timestamp;
          const timeB = timestampB.toDate().getTime();
          if ( timeA > timeB ) { return 1 };
          if ( timeA < timeB ) { return -1 };
          return 0;
        } );
        return messages;
      }
    ));
  }

  getChatGroupName( characters: Character[] ): string{
    const tempCharacters = [ ...characters ].sort( ( a, b ) => {
      if ( a.name > b.name ) { return 1 };
      if ( a.name < b.name ) { return -1 };
      return 0;
    } );
    const tempNames = tempCharacters.map( character => character.name );
    console.log( tempNames );
    return tempNames.join( '_' );
  }

  addMessage( chatMembers: Character[], content: string, timestamp: firestore.Timestamp, from: string ) {
    const chatGroupName = this.getChatGroupName( chatMembers );
    this.afs.collection( 'chats' )
      .doc( chatGroupName )
      .collection<Message>( 'messages' )
      .add( {from, content, timestamp} );
}

}
