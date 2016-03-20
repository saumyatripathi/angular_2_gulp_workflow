import { Component, OnInit } from 'angular2/core';
import {TestService} from './test.service';

@Component({
	selector: 'my-test',
	template: '<p>{{testText}}</p>',
})
export class TestComponent {
	constructor(private _testService: TestService) { }
	testText:string;
	ngOnInit() { this.getTestText(); }

	getTestText() {
		this._testService.getTestText()
			.subscribe(
			testText => this.testText = testText);
	}
}