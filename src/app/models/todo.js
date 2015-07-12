import Backbone from 'backbone';

export default Backbone.Model.extend({

	defaults() {
		return {
			title: 'empty todo...',
			done: false
		};
	},

	toggle() {
		this.save({done: !this.get('done')});
	}
});
