import Ember from 'ember';

export default Ember.Component.extend({
	// attributeBindings: 'draggable',
	// draggable: true,
	
classNames        : [ 'draggableItem', 'teamMember' ],
  attributeBindings : [ 'draggable' ],
  draggable         : 'true',
	
	editName: false,
	
	dragStart: function(event){
		console.log('Start dragging!');
		return event.dataTransfer.setData('text/data', this.get('member.id'));
	},
	
	actions: {
		doEditName: function(){
			this.set('editName', true);
			this.set('draggable', false);
		},
		saveEditName: function(){
			this.set('editName', false);
			this.set('draggable', true);
		}
	}
	
	
});
