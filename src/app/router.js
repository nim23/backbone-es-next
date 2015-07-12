import $ from 'jquery';
import Backbone from 'backbone';
import App from './views/app';

export default Backbone.Router.extend({

	routes: {
		'*path': 'defaultRoute'
	},

	defaultRoute() {
		const app = new App();
	}

});
