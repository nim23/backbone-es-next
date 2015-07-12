import _ from 'underscore';
import Backbone from 'backbone';
import {tagName, template, on} from '../decorators';

@tagName('li')
@template(require('../template/item.html'))
class TodoView extends Backbone.View {

	initialize() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	}

	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('done', this.model.get('done'));
		this.input = this.$('.edit');
		return this;
	}

	@on('click .toggle')
	toggleDone() {
		this.model.toggle();
	}

	@on('dblclick .view')
	edit() {
		this.$el.addClass('editing');
		this.input.focus();
	}

	@on('blur .edit')
	close() {
		let value = this.input.val();

		if (!value) {
			this.clear();
		} else {
			this.model.save({title: value});
			this.$el.removeClass('editing');
		}
	}

	@on('keypress .edit')
	updateOnEnter(e) {
		if (e.keyCode === 13) this.close();
	}

	@on('click .destroy')
	clear() {
		this.model.destroy();
	}
};

export default TodoView;
