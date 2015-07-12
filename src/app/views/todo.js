import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.View.extend({

	tagName: 'li',

	template: _.template(require('../template/item.html')),

	events: {
		'click .toggle': 'toggleDone',
		'dbclick .view': 'edit',
		'click a.destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close',
	},

	initialize() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('done', this.model.get('done'));
		this.input = this.$('.edit');
		return this;
	},

	toggleClass() {
		this.model.toggle();
	},

	edit() {
		this.$el.addClass('editing');
		this.input.focus();
	},

	close() {
		let value = this.input.val();

		if (!value) {
			this.clear();
		} else {
			this.model.save({title: value});
			this.$el.removeClass('editing');
		}
	},

	updateOnEnter(e) {
		if (e.keyCode === 13) this.close();
	},

	clear() {
		this.model.destroy();
	}

});
