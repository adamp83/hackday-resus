import Ember from 'ember';

export default Ember.Controller.extend({
	displayStatuses: false,
	
	awaitingStatus: function(){
		return (this.get('model.statuses') != undefined) && (this.get('model.status') == undefined);
	}.property('model.status', 'model.statuses'),
	
	actions: {
		clickButton: function(button){
			var userText = undefined;
			var text = button.get('title');
			
			if(button.isToggleable){
				if(button.get('isActive')){
					button.set('isActive', false);
					var duration = moment.duration(Date.now() - button.get('countFrom'));
					var durationStr = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss")
					button.set('activeDuration', durationStr);
					text = text + " stopped (" + durationStr +")";
				}else{
					button.set('isActive', true);
					if(button.get('hasTimer')){
						button.set('countFrom', Date.now());
						button.set('activeDuration', null);
					}
					text = text + " started";
				}
			}else{
				if(button.get('hasTimer')){
					button.set('countFrom', Date.now());
				}
			}
			
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
					text: text,
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
	},
	
	updateTimer: function(){
		var button = this.get('model');
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
