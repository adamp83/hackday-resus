import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
	displayStatuses: false,
	hoverOver: false,
	
	classNames        : [ 'draggableDropzone' ],
  	classNameBindings : [ 'dragHover' ],
	
	counter: 0,

	
	awaitingStatus: function(){
		return (this.get('button.statuses') !== undefined) && (this.get('button.status') === undefined);
	}.property('button.status', 'button.statuses'),
	
	
	dragEnter: function(event){
		this.set('counter', this.get('counter') + 1);

		event.preventDefault();

		if(this.element.localName === "div"){
			this.set('displayStatuses', true);
		}
		
	},
	
	dragLeave: function(event){
		this.set('counter', this.get('counter') - 1);

		event.preventDefault();

		if(this.get('counter') === 0){
			this.set('displayStatuses', false);
			this.set('hoverOver', false);
		}
		// this.set('displayStatuses', false);
	},
	dragOver: function(event){
		event.preventDefault();
		this.set('hoverOver', true);
		// console.log('dragOver');
	},
	
	drop: function(event){
		event.preventDefault();
		this.set('hoverOver', false);
		//For some reason this doesn't get called when I drop. DragLeave does...

		var id = event.dataTransfer.getData('text/data');

		var store = this.get('button.store');
		var _this = this;
		store.find('member', id).then(function(member){

			if(member){
				_this.doButtonAction(member);
				if(this.get('button.statuses'))
					this.set('displayStatuses', false);
			}
		});
		
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

				var record = button.store.createRecord('record', {
					button: button,
					userText: userText,
					text: text,
					time: Date.now()
				});
				// if(member){
					record.set('member', member);
				// }
				
			}
			else{
				//Does have statuses: display to user!
				
			}
	},
	
	actions: {
		clickButton: function(){
			this.doButtonAction();
			if(this.get('button.statuses'))
				this.toggleProperty('displayStatuses');
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
	}.on('init'),
	
	// Hide status options when changed
	hideStatuses: function(){
		this.set('displayStatuses', false);
	}.observes('button.status')
});
