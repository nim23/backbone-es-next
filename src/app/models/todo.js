import Backbone from 'backbone';

class Todo extends Backbone.Model {

	defaults() {
		return {
			title: 'empty todo...',
			done: false
		};
	}

	toggle() {
		this.save({done: !this.get('done')});
	}
};

export default Todo;
