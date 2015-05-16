import DS from 'ember-data';

var Button = DS.Model.extend({
	title: DS.attr('text'),
	category: DS.belongsTo('category')
});

Button.reopenClass({
	FIXTURES: [
		{id: 1, title: "Check airway", category: 1},
		{id: 2, title: "Administer O2", category: 2}
		
	]
});

export default Button;