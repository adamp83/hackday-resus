import Ember from 'ember';

export default Ember.Component.extend({
	displayStatuses: false,
	
	awaitingStatus: function(){
		return (this.get('button.statuses') != undefined) && (this.get('button.status') == undefined);
	}.property('button.status', 'button.statuses'),
	
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
				button.store.createRecord('record', {
					button: button,
					userText: userText,
					time: Date.now()
				});
			}
			else{
				//Does have statuses: display to user!
				this.toggleProperty('displayStatuses');
			}
			if(button.get('hasTimer')){
				button.set('countFrom', Date.now());
			}
		},
		
		selectStatus: function(button, status){
			button.set('status', status);
			button.store.createRecord('record', {
				button: button,
				userText: status,
				time: Date.now()
			});
			this.set('displayStatuses', false);
		}
	},
	
	updateTimer: function(){
		var button = this.get('button');
		if(button.get('hasTimer')){
			setInterval(function(){
				if(button.get('countFrom')){
					var duration = moment.duration(Date.now() - button.get('countFrom'), 'milliseconds');
					var str = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss")
					
					button.set('timer', str);
				}
			}, 100);
		}
	}.on('init')
});
