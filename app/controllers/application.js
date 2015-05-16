import Ember from 'ember';

export default Ember.Controller.extend({
	
	records: function(){
		return this.store.all('record');
	}.property('record'),
	
});
