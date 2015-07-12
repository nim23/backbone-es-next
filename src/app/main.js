import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import 'backbone.localStorage';
import Router from './router';

const router = new Router();

Backbone.history.start();
