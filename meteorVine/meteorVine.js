Vines = new Mongo.Collection("vines");

if (Meteor.isClient) {
 Meteor.subscribe("vines");
 
  Template.hello.helpers({
    counter: function () {
      return Vines.find({}).count();
    },
	 vines: function () {
      return Vines.find({});
    },
	isOwner: function () {
	return this.owner === Meteor.userId();
	}
  });

  Template.hello.events({
	"submit .new-vine": function (event) {
		var text = event.target.text.value;
		Meteor.call("addVine", text);
		event.target.text.value = "";
		return false;
	}
  });
  
  Template.vine.events({
	"submit .like-vine": function (event) {
		event.preventDefault();
		var vineID=event.target.vine.value;
		Meteor.call("likeVine",vineID);
		return false;
	}
  });
	
	Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
	});
	
	Template.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
	});
}

	 Meteor.methods({
		addVine: function (name) {
			Vines.insert({
			name: name,
			createdAt: new Date(),
			author:Meteor.userId(),
			likes:0
			});
		},
		likeVine: function (vine) {
		console.log(vine);
			Vines.update({
			_id: vine}
			,{  $inc: {"likes":1}
			});
		}
	});

if (Meteor.isServer) {
  Meteor.publish("vines", function () {
    return Vines.find();
  });
  
  Meteor.startup(function(){
    Vines.remove({});
});
}
