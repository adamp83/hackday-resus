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
		}
		
		
	}
	
});
