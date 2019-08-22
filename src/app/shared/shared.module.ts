import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierPipe } from './pipes/modifier.pipe';
import { UnCamelCasePipe } from './pipes/un-camel-case.pipe';
import { DiePipe } from './pipes/die.pipe';



@NgModule({
  declarations: [ ModifierPipe,
    UnCamelCasePipe,
    DiePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModifierPipe,
    UnCamelCasePipe,
    DiePipe
  ]
})
export class SharedModule { }
