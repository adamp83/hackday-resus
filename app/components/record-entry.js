import Ember from 'ember';

export default Ember.Component.extend({
	
	tagName: 'li',
	editingText: false,
	
	didInsertElement: function(){
		var sel = '.resus-event-log';
		if(Ember.$(sel)[0]){
			Ember.$(sel).scrollTop( Ember.$(sel)[0].scrollHeight );
		}
	},
	
	actions: {
		finishedEditing: function(){
			this.set('editingText', false);
			this.editingText = false;
		},
		editUserText: function(){
			this.set('editingText', true);
		},
		
		deleteRecord: function(){
			var record = this.get('record');
			if(record.get('userDeleted')){
				record.set('userDeleted', false);
			}else{
				record.set('userDeleted', true);
			}
			// this.get('record').set('isDestroyed', !this.get('record.isDeleted'));
		}
	}
	
});
