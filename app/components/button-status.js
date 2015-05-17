import Ember from 'ember';

export default Ember.Component.extend({
	
	tagName: 'li',
	
	drop: function(event){
		event.preventDefault();

		var id = event.dataTransfer.getData('text/data');
		var store = this.get('button.store');
		var _this = this;
		var status = this.possibleStatus;
		var button = this.button;
		// button.set('status', status);
		store.find('member', id).then(function(member){
			if(member){
				button.set('status', status);
				button.store.createRecord('record', {
					button: button,
					userText: status,
					time: Date.now(),
					text: button.get('title'),
					member: member
				});
			}
		});
		
	},
	
	actions: {
		
		selectStatus: function(){
			var button = this.button;
			var status = this.possibleStatus;
			button.set('status', status);
			button.store.createRecord('record', {
				button: button,
				userText: status,
				time: Date.now(),
				text: button.get('title')
			});
		}
	}
});
