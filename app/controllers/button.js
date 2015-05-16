import Ember from 'ember';

export default Ember.Controller.extend({
	displayStatuses: false,
	
	actions: {
		clickButton: function(button){
			if(!button.get('statuses')){
				this.store.createRecord('record', {
					button: button,
					time: Date.now()
				});
			}
			else{
				//Does have statuses: display to user!
				this.toggleProperty('displayStatuses');
			}
		},
		
		selectStatus: function(button, status){
			button.set('status', status);
			this.store.createRecord('record', {
				button: button,
				userText: status,
				time: Date.now()
			});
			this.set('displayStatuses', false);
		}
	}
});
