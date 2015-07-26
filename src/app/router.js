import $ from 'jquery';
import Backbone from 'backbone';
import App from './views/app';
import {props, route} from './decorators';

class AppRouter extends Backbone.Router {

	@route('*path')
	defaultRoute() {
		const app = new App();
	}

};
export default AppRouter;
