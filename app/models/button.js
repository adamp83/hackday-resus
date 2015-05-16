import DS from 'ember-data';

var Button = DS.Model.extend({
	title: DS.attr('text'),
	category: DS.belongsTo('category'),
	statuses: DS.attr('array'),
	count: DS.attr('integer'),
	counted: DS.attr('boolean'),
	status: DS.attr(),
});

Button.reopenClass({
	FIXTURES: [
		{id: 1, title: "Airway assessment", category: 1},
		{id: 2, title: "Airway manoeuvre", category: 1},
		{id: 3, title: "Guedel airway", category: 1},
		{id: 4, title: "Nasopharyngeal airway", category: 1},
		{id: 5, title: "Intubation attempt started", category: 1},
		{id: 6, title: "Intubation attempt ended", category: 1},
		
		{id: 7, title: "Administer O2", category: 2},
		{id: 8, title: "Bag-valve mask ventilation", category: 2},
		{id: 9, title: "Ventilator", category: 2},
		
		{id: 10, title: "Rhythm", statuses: ['Asystole', 'PEA', 'VF', 'Spontaneous circulation'], status: undefined, category: 3},
		{id: 14, title: "IV access", category: 3},
		{id: 15, title: "DC Shock", counted: true, category: 3},
		{id: 16, title: "ROSC", category: 3},
		{id: 17, title: "Adrenaline", category: 3},
		{id: 18, title: "Amiodarone", category: 3},
		{id: 19, title: "Fluid bolus", category: 3},
		
		{id: 20, title: "Glucose", category: 4},
		{id: 21, title: "Blood loss", category: 4},
		{id: 22, title: "Pupils", category: 4},
		{id: 23, title: "Temperature", category: 4},
		
		{id: 24, title: "Member arrives", category: 5},
		{id: 25, title: "Member leaves", category: 5},
		{id: 26, title: "Delegate task", category: 5},
		
		
	]
});

export default Button;