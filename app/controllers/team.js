import Ember from 'ember';

export default Ember.Controller.extend({
	membersAdded: 0,
	
	members: function(){
		return this.store.all('member');
	}.property('member'),
	
	actions: {
		addMember: function(){
			var index = this.get('membersAdded')+1;
			this.set('membersAdded', index);
			var m = this.store.createRecord('member', {name: 'Minion ' + index});
			this.store.createRecord('record', {
				userText: m.get('name') + ' joined.',
				time: Date.now()
			});
		},
	}
});
