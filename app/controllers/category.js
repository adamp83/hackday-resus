import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: 'application',
	
	buttons: function(){
		var arrestMode = this.get('controllers.application.arrestMode');
		console.log('recalc buttons! ' + arrestMode);
		var model = this.get('model');
		return this.store.filter('button', function(b){
			var ret
			ret = ((b.get('arrestMode') && arrestMode) || (b.get('sickMode') &! arrestMode)) && (b.get('category') == model);
			console.log(ret);
			return ret;
		});
	}.property('controllers.application.arrestMode', 'model'),
});
