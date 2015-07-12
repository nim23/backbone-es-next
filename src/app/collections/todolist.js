import Backbone from 'backbone';
import Todo from '../models/todo';

export default Backbone.Collection.extend({

	model: Todo,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	done() {
		return this.where({done: true});
	},

	remaining() {
		return this.where({done: false});
	},

	nextOrder() {
		if (!this.length) return 1;

		return this.last().get('order') + 1;
	},

	comparator: 'order'
});
