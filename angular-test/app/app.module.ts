import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HelloAngular } from './app.component';


@NgModule({
	imports: [ BrowserModule ],
	declarations: [ HelloAngular ],
	bootstrap: [ HelloAngular ]
})

export class HelloAngularAppModule {

}