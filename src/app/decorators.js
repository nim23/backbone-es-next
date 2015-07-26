import _ from 'underscore';

export function tagName(value) {
		return function decorator(target) {
				target.prototype.tagName = value;
		}
}

export function template(value) {
		return function decorator(target) {
				target.prototype.template = _.template(value);
		}
}

export function props(obj) {
	return function decorator(target) {
		_.extend(target.prototype, obj);
	}
}

export function route(path) {
	return function decorator(target, name, descriptor) {
		if(!target.routes) {
			target.routes = {};
		}
		if(_.isFunction(target.routes)) {
			throw new Error('The on decorator is not compatible with a routes method');
			return;
		}
		if(!path) {
			throw new Error('The on decorator requires an route argument');
		}
		target.routes[path] = name;
		return descriptor;
	}
}

export function on(eventName){
	return function decorator(target, name, descriptor){
		if(!target.events) {
				target.events = {};
		}
		if(_.isFunction(target.events)) {
				throw new Error('The on decorator is not compatible with an events method');
				return;
		}
		if(!eventName) {
				throw new Error('The on decorator requires an eventName argument');
		}
		target.events[eventName] = name;
		return descriptor;
	}
}
