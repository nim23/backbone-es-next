import Backbone from 'backbone';
import Todo from '../models/todo';
import {props} from '../decorators';

@props({
	model: Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	comparator: 'order'
})
class Todos extends Backbone.Collection {

	done() {
		return this.where({done: true});
	}

	remaining() {
		return this.where({done: false});
	}

	nextOrder() {
		if (!this.length) return 1;
		return this.last().get('order') + 1;
	}
};

export default Todos;
