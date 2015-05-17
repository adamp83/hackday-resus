import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
	displayStatuses: false,
	
	awaitingStatus: function(){
		return (this.get('button.statuses') !== undefined) && (this.get('button.status') === undefined);
	}.property('button.status', 'button.statuses'),
	
	
	dragEnter: function(event){
		console.log('enter!');
	},
	
	dragLeave: function(event){
		console.log('leave!');
	},
	
	drop: function(event){
		//For some reason this doesn't get called when I drop. DragLeave does...
		console.log('drop');
		var id = event.dataTransfer.getData('text/data');
		var member;
		if(member = this.store.find('member', id)){
			this.doButtonAction(member);
		}
	},
	
	doButtonAction: function(member){
		//Need to implement member handling where appropriate
		var userText = undefined;
			var button = this.get('button');
			var text = button.get('title');
			if(button.get('isToggleable')){
				if(button.get('isActive')){
					button.set('isActive', false);
					var duration = moment.duration(Date.now() - button.get('countFrom'));
					var durationStr = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
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
				var userText = "";
				if(button.get('counted')){
					if(!button.get('count')){
						button.set('count', 1);
					}
					else{
						button.set('count', button.get('count') + 1);
					}
					userText = "Count: " + button.get('count').toString();
				}
				button.store.createRecord('record', {
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
	
	actions: {
		clickButton: function(){
			this.doButtonAction();
		},
		
		selectStatus: function(button, status){
			button.set('status', status);
			button.store.createRecord('record', {
				button: button,
				userText: status,
				time: Date.now(),
				text: button.get('title')
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
					var str = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
					
					button.set('timer', str);
				}
			}, 100);
		}
	}.on('init')
});
