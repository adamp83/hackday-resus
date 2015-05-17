import DS from 'ember-data';

var Member = DS.Model.extend({
	records: DS.hasMany('record'),
	name: DS.attr('string'),
	left: DS.attr('boolean', {defaultValue: false})
});

Member.reopenClass({
	FIXTURES: [
		{id: 1, name: 'Me'}
	]
});

export default Member;