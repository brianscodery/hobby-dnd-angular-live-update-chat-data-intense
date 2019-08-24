import { AngularMaterialBundleModule } from '../shared/angular-material-bundle.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule( {
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp( environment.firebase ),
    SharedModule,
    AngularMaterialBundleModule,
    NgxAuthFirebaseUIModule.forRoot( environment.firebase ),

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireFunctionsModule,
    AngularMaterialBundleModule,
    NgxAuthFirebaseUIModule
  ],
} )

export class CoreModule { }