import DS from 'ember-data';

var Button = DS.Model.extend({
	title: DS.attr('text'),
	category: DS.belongsTo('category'),
	statuses: DS.attr('array'),
	count: DS.attr('integer'),
	counted: DS.attr('boolean'),
	countFrom: DS.attr('date'),
	hasTimer: DS.attr('boolean'),
	timer: DS.attr('number'),
	isToggleable: DS.attr('boolean'),
	isActive: DS.attr('boolean'),
	activeDuration: DS.attr('number'),
	status: DS.attr(),
	arrestMode: DS.attr('boolean', {defaultValue: true}),
	sickMode: DS.attr('boolean', {defaultValue: true}),
});

Button.reopenClass({
	FIXTURES: [

		{id: 1, title: "Airway status", statuses: ['Patent', 'Non-patent'] , category: 1},
		{id: 2, title: "Airway support", statuses: ['None required', 'Manouevres', 'Guedel', 'Nasopharyngeal', 'Laryngeal mask-airway', 'Endotracheal tube', 'Trachoetomy', 'Tracheostomy'], category: 1},
		{id: 3, title: "Intubation", hasTimer: true, category: 1, isToggleable: true, hasTimer: true},
		
		{id: 4, title: "Breathing", statuses: ['Sufficient self-ventilation', 'Insufficient self-ventilation', 'CPAP', 'Bilevel non-invasive pressure support', 'Bag-valve mask ventilation', 'Manual ventilation', 'Mechanically ventilated'], category: 2},
		{id: 5, title: "Oxygen delivery", statuses: ['High flow O2', 'Venturi device', 'Nasal cannulae', 'Face-mask', 'Room air'], category: 2},
		
		{id: 6, title: "Rhythm", statuses: ['Asystole', 'PEA', 'VF', 'Sinus rhythm', 'Arrhythmia'], status: undefined, category: 3},
		{id: 7, title: "IV access", category: 3},
		{id: 8, title: "DC Shock", counted: true, category: 3, hasTimer: true, sickMode: false},
		{id: 51, title: "DC Cardioversion", counted: true, category: 3, hasTimer: true, arrestMode: false},
		{id: 9, title: "Adrenaline bolus", counted: true, category: 3, hasTimer: true, sickMode: false},
		{id: 10, title: "Amiodarone bolus", counted: true, category: 3},
		{id: 11, title: "Fluid bolus", counted: true, category: 3},
		{id: 50, title: "CPR", isToggleable: true, hasTimer: true, category: 3, sickMode: false},
		
		{id: 12, title: "Glucose", statuses: ['Low', 'Acceptable', 'High'], category: 4},
		{id: 13, title: "Responsiveness", statuses: ['Alert', 'Verbal', 'Pain', 'Unresponsive'], arrestMode: false, category: 4},
		{id: 14, title: "Pupils", statuses: ['normal', 'dilated and responsive', 'fixed dilated', 'constricted', 'asymmetric'], category: 4},
		{id: 15, title: "Motor GCS", statuses: ['6 - Follows commands', '5 - Localises pain', '4 - Withdraws from pain', '3 - Flexion response', '2 - Extensor response', '1 - No response'], arrestMode: false, category: 4},
		{id: 16, title: "Verbal GCS", statuses: ['5 - Coherent', '4 - Confused/inappropriate speech', '3 - Inappropriate words', '2 - Noises', '1 - No sounds'], arrestMode: false, category: 4},
		{id: 17, title: "Eye GCS", statuses: ['4 - Confused/inappropriate speech', '3 - Inappropriate words', '2 - Noises', '1 - No sounds'], arrestMode: false, category: 4},
		{id: 18, title: "Temperature", category: 4},

		{id: 19, title: "Hypoxia", statuses: ['Considered causal', 'Not considered causal'], category: 5},
		{id: 20, title: "Hypovolaemia", statuses: ['Not suspected', 'Presumed', 'Suspected', 'Confirmed'], category: 5},
		{id: 21, title: "Electrolyte abnormalities", statuses: ['Awaited', 'Checked - no issues', 'Problems'], category: 5},
		{id: 22, title: "Hypothermia", statuses: ['None', 'Present'], category: 5},
		{id: 23, title: "Tension pneumothorax", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 24, title: "Tamponade", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 25, title: "Thrombosis", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},
		{id: 26, title: "Toxins", statuses: ['Not suspected', 'Suspected', 'Confirmed', 'Treated'], category: 5},

		{id: 27, title: "Member arrives", category: 6},
		{id: 28, title: "Member leaves", category: 6},
		{id: 29, title: "Delegate task", category: 6},
		
		
	]
});

export default Button;