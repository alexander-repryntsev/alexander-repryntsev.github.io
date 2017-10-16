import { Component } from '@angular/core';

import { Module } from './app.module';

@Component({
	selector: 'hello-angular',
	template: `<ul>
	 				<li *ngFor="let name of names"> Hello {{name}} </li>
				</ul>
	 `
})

export class HelloAngular {
	names: string[];

	constructor() {
		this.names = ["Sasha", "Vasya", "Yulya"]; 
	}
}