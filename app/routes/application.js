import Ember from 'ember';

export default Ember.Route.extend({
	
	model: function(){
		this.store.find('button');
		return this.store.find('category');
	},
	
	setupController: function(controller, model){
		this._super(controller, model);
		
		
	}
	
});
