import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http'
import {TestComponent} from './test.component'
import {TestService} from './test.service';

@Component({
	selector: 'my-app',
	template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Test']">Test A</a>
      <a [routerLink]="['Test']">Another Test</a>
    </nav>
    <router-outlet></router-outlet>
  `,
	directives: [ROUTER_DIRECTIVES],
	providers: [
		HTTP_PROVIDERS,
		TestService
	]
})

	@RouteConfig([
		{
			path: '/test',
			name: 'Test',
			component: TestComponent
		}
	])

export class AppComponent {
	title = 'My Test';
}