import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
	
	appStartTime: undefined,
	resusTimer: 0.0,
	resusTimerStr: "0:00:00",
	timerStarted: false,
	
	arrestMode: true,
	presumedArrest: true,
	
	resusStatuses: ['For full resuscitation', 'For limited resuscitation', 'Not for resuscitation', 'Unknown resuscitation status'],
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
		this.set('appStartTime', Date.now());
		this.store.createRecord('record', {
				text: 'Opened app. Resus presumed.',
				time: Date.now()
			});
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
		},
		
		makePDF: function(){
			var doc = new jsPDF();

			this.set('pdfMode', true);
			// We'll make our own renderer to skip this editor
			var specialElementHandlers = {
				'.no-print': function(element, renderer){
					console.log('no print');
					return true;
				},
			};
			var _this = this;
			var elm = $('#resus-log').get(0);
			Ember.run.scheduleOnce('afterRender', function(){
				// All units are in the set measurement for the document
				// This can be changed to "pt" (points), "mm" (Default), "cm", "in"
				doc.fromHTML(elm, 15, 15, {
					'width': 170, 
					'elementHandlers': specialElementHandlers
				});
				
				_this.set('pdfMode', false);
				
				doc.save('Resus log ' + moment(_this.get('appStartTime')).format('YYYY-MM-DD hh:mm') + '.pdf');	
			});
				
		}
	}

});
