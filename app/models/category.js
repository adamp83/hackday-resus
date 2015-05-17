import DS from 'ember-data';

var Category = DS.Model.extend({
	title: DS.attr('text'),
	buttons: DS.hasMany('button')
});

Category.reopenClass({
	FIXTURES: [
		{id: 1, title: "Airway"},
		{id: 2, title: "Breathing"},
		{id: 3, title: "Circulation"},
		{id: 4, title: "Disability/Exposure"},
		{id: 5, title: "Reversible Causes"}/*,
		{id: 6, title: "Team"},*/
	]
});

export default Category;