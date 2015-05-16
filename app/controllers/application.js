import Ember from 'ember';

export default Ember.Controller.extend({
	
	records: function(){
		return this.store.all('record');
	}.property('record'),
	
	actions: {
		addRecord: function(button){
			this.store.createRecord('record', {
				button: button,
				time: Date.now()
			})
		},
		finishedEditing: function(record){
			record.set('editingText', false);
			return false;
		},
		editUserText: function(record){
			record.set('editingText', true);
			return false;
		}
		
	}
	
});
