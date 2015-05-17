import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
	
	resusTimer: 0.0,
	resusTimerStr: "0:00:00",
	timerStarted: false,
	
	arrestMode: true,
	presumedArrest: true,
	
	resusStatuses: ['For full resuscitation', 'For limited resuscitation', 'Not for resuscitation'],
	resusStatus: undefined,
	displayResusStatuses: false,
	
	hasResusStatus: function(){
		return (this.get('resusStatus') != undefined);
	}.property('resusStatus'),
	
	records: function(){
		return this.store.all('record');
	}.property('record'),
	
	setupTimer: function(){
		var _this = this;
		setInterval(function(){
			if(_this.get('timerStarted')){
				var duration = moment.duration(_this.get('resusTimer'), 's');
				var durationStr = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
				_this.set('resusTimer', Number((_this.get('resusTimer') + 0.1).toFixed(2)));
				_this.set('resusTimerStr', durationStr);
			}
		}, 100);
		this.set('timerStarted', true);
	}.on('init'),
	
	actions: {
		addRecord: function(button){
			this.store.createRecord('record', {
				button: button,
				time: Date.now()
			});
		},
		
		startTimer: function(){
			this.set('timerStarted', true);
		},
		
		startArrest: function(){
			this.set('arrestMode', true);
			this.send('resetTimer');
			this.send('startTimer');
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Arrest declared'
			});
		},
		isArrest: function(){
			this.set('presumedArrest', false);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Presumed arrest confirmed.'
			});
		},
		notArrest: function(){
			this.set('presumedArrest', false);
			this.set('arrestMode', false);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Presumed arrest stood down.'
			});
		},
		endArrest: function(){
			this.set('arrestMode', false);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'ROSC declared after ' + this.get('resusTimerStr')
			});
			this.send('stopTimer');
			this.send('resetTimer');
			
			// Reset timers on all buttons
			this.store.all('button').forEach(function(x){
				if(x.get('hasTimer')){
					x.set('timer', undefined);
					x.set('countFrom', undefined);
				}
			});

		},
		stopTimer: function(){
			this.set('timerStarted', false);
		},
		resetTimer: function(){
			this.set('resusTimer', 0);
		},
		saveCustomRecord: function(){
			if(this.get('newCustomRecordText')){
				this.store.createRecord('record',{
					time: Date.now(),
					text: this.get('newCustomRecordText')
				});
			}
			this.set('newCustomRecordText', null);
		},
		
		toggleResusStatuses: function(){
			this.toggleProperty('displayResusStatuses');
		},
		
		selectResusStatus: function(status){
			this.set('resusStatus', status);
			this.set('displayResusStatuses', false);
			this.store.createRecord('record',{
				time: Date.now(),
				text: 'Resus status selected: ' + status
			});
		}

	}

});
