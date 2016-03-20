import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class TestService {
	constructor(private http: Http) { }
	private _testUrl = 'api';  // URL to web api

	getTestText(){
		return this.http.get(this._testUrl)
			.map(res => <string>res.json().data);
	}
}