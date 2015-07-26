import $ from 'jquery';
import TodoView from '../views/todo';
import Todos from '../collections/todolist';
import _ from 'underscore';
import backbone from 'backbone';
import {props, template, on} from '../decorators';

@props({
	el: $('#todoapp'),
	statsTemplate: _.template(require('../template/stats.html'))
})
class AppView extends Backbone.View {

	initialize() {
		this.input = this.$("#new-todo");
		this.allCheckbox = this.$("#toggle-all")[0];

		this.todos = new Todos();

		this.listenTo(this.todos, 'add', this.addOne);
		this.listenTo(this.todos, 'reset', this.addAll);
		this.listenTo(this.todos, 'all', this.render);

		this.footer = this.$('footer');
		this.main = $('#main');

		this.todos.fetch();
	}

	render() {
		let done = this.todos.done().length;
		let remaining = this.todos.remaining().length;

		if (this.todos.length) {
			this.main.show();
			this.footer.show();
			this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
		} else {
			this.main.hide();
			this.footer.hide();
		}

		this.allCheckbox.checked = !remaining;
	}

	addOne(todo) {
		let view = new TodoView({model: todo});
		this.$("#todo-list").append(view.render().el);
	}

	addAll() {
		this.todos.each(this.addOne, this);
	}

	@on('keypress #new-todo')
	createOnEnter(e) {
		if (e.keyCode != 13) return;
		if (!this.input.val()) return;

		this.todos.create({title: this.input.val()});
		this.input.val('');
	}

	@on('click #clear-completed')
	clearCompleted() {
		_.invoke(this.todos.done(), 'destroy');
		return false;
	}

	@on('click #toggle-all')
	toggleAllComplete() {
		let done = this.allCheckbox.checked;
		this.todos.each((todo) => { todo.save({'done': done}); });
	}
};

export default AppView;
