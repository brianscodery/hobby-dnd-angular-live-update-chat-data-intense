import { Character, SpokenLanguage } from '../shared/common-interfaces-and-types';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;
import { map } from 'rxjs/operators';

export interface Message {
  from: string;
  content: string;
  timestamp: Timestamp;
  language: SpokenLanguage;
  date?: Date;

}

@Injectable( {
  providedIn: 'root'
} )
export class ChatService {

  constructor ( public afs: AngularFirestore ) { 
    this.deleteBlankMessages( [ { name: 'tonitrus' }, { name: 'js' } ] );
  }

  getChatMessages( characters: any[] ): Observable<Message[]> {
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
          messages.map( message => {
            message.date = message.timestamp.toDate();
            return message;
        })  
        return messages;
      }
    ));
  }

  getChatGroupName( characters: any[] ): string{
    const tempCharacters = [ ...characters ].sort( ( a, b ) => {
      if ( a.name > b.name ) { return 1 };
      if ( a.name < b.name ) { return -1 };
      return 0;
    } );
    const tempNames = tempCharacters.map( character => character.name );
    console.log( tempNames );
    return tempNames.join( '_' );
  }

  addMessage( chatMembers: any[], content: string, timestamp: firestore.Timestamp, from: string, language: SpokenLanguage ): Promise<DocumentReference> {
    const chatGroupName = this.getChatGroupName( chatMembers );
    const docRef = this.afs.collection( 'chats' )
      .doc( chatGroupName );
    //this shoudn't be done first, but i don't care right now
    docRef.update( { last: timestamp});
    return docRef.collection<Message>( 'messages' )
      .add( { from, content, timestamp, language } );
  }

  deleteBlankMessages( chatMembers: any[] ) {
    const chatGroupName = this.getChatGroupName( chatMembers );
    const messagesRef = this.afs
      .collection( 'chats' )
      .doc( chatGroupName )
      .collection<Message>( 'messages', ref =>
        ref.where( 'content', '==', '') )
   .get().toPromise().then(querySnapshot=>{
      querySnapshot.forEach( doc => {
        doc.ref.delete();
      })
    })
  }

}
