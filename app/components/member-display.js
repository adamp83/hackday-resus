import Ember from 'ember';

export default Ember.Component.extend({
	attributeBindings: 'draggable',
	draggable: true,
	
	dragStart: function(event){
		console.log('Start dragging!');
		return event.dataTransfer.setData('text/data', this.get('member.id'));
	}
});
