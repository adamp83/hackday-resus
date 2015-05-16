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
		{id: 1, title: "Airway status", statuses: ['Patent', 'Non-patent'], , category: 1},
		{id: 2, title: "Airway support", statuses: ['Manouevres', 'Guedel', 'Nasopharyngeal', 'Laryngeal mask-airway', 'Endotracheal tube', 'Trachoetomy', 'Tracheostomy'], category: 1},
		{id: 5, title: "Intubation attempt started", category: 1},
		{id: 6, title: "Intubation attempt ended", category: 1},
		
		{id: 35, title: "Breathing", statuses: ['Sufficient self-ventilation', 'Insufficient self-ventilation', 'Bag-valve mask ventilation', 'Manual ventilation through ', 'Mechanically ventilated'], category: 2},
		{id: 36, title: "Administer O2", category: 2},
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
		
		{id: 24, title: "Hypoxia", statuses: ['Considered causal', 'Not considered causal'], category: 5},
		{id: 25, title: "Hypovolaemia", statuses: ['Not suspected', 'Presumed', 'Suspected', 'Confirmed'], category: 5},
		{id: 26, title: "Electrolyte abnormalities", statuses: ['Awaited', 'Checked - no issues', 'Problems'], category: 5},
		{id: 27, title: "Hypothermia", statuses: ['None', 'Present'], category: 5},
		{id: 28, title: "Tension pneumothorax", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 29, title: "Tamponade", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 30, title: "Thrombosis", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 31, title: "Toxins", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		
		{id: 32, title: "Member arrives", category: 6},
		{id: 33, title: "Member leaves", category: 6},
		{id: 34, title: "Delegate task", category: 6},
		
		
	]
});

export default Button;