import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDividerModule,
  MatSelectModule,
} from '@angular/material';

@NgModule( {
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp( environment.firebase ),

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
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
  ],
} )

export class CoreModule { }