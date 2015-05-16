import Ember from 'ember';

export default Ember.Controller.extend({
	displayStatuses: false,
	
	awaitingStatus: function(){
		return (this.get('model.statuses') != undefined) && (this.get('model.status') == undefined);
	}.property('model.status', 'model.statuses'),
	
	actions: {
		clickButton: function(button){
			var userText = undefined;
			if(!button.get('statuses')){
				if(button.get('counted')){
					if(!button.get('count'))
						button.set('count', 1);
					else
						button.set('count', button.get('count') + 1);
					userText = button.get('count');
				};
				this.store.createRecord('record', {
					button: button,
					userText: userText,
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
