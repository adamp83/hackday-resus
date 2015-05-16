import Ember from 'ember';

export default Ember.Controller.extend({
	
	resusTimer: 0.0,
	timerStarted: false,
	
	records: function(){
		return this.store.all('record');
	}.property('record'),
	
	setupTimer: function(){
		var _this = this;
		setInterval(function(){
			if(_this.get('timerStarted')){
				_this.set('resusTimer', Number((_this.get('resusTimer') + 0.1).toFixed(2)));
			}
		}, 100);
	}.on('init'),
	
	actions: {
		addRecord: function(button){
			this.store.createRecord('record', {
				button: button,
				time: Date.now()
			})
		},
		
		startTimer: function(){
			this.set('timerStarted', true);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Arrest Started'
			});
			
		},
		
		stopTimer: function(){
			this.set('timerStarted', false);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Timer stopped'
			});
		}

	}
	
});
