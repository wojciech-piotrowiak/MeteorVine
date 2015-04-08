Vines = new Mongo.Collection("vines");
Recipies = new Mongo.Collection("recipies");
 
if (Meteor.isClient) {
 Meteor.subscribe("vines");
 Meteor.subscribe("recipies");
 
  Template.allVines.helpers({
    counter: function () {
      return Vines.find({}).count();
    },
	 vines: function () {
      return Vines.find({});
    }
  });
  
  Template.recipies.helpers({
	 recipies: function () {
      return Recipies.find({});
    }
  });

  Template.allVines.events({
	"submit .new-vine": function (event) {
		var text = event.target.text.value;
		Meteor.call("addVine", text);
		event.target.text.value = "";
		return false;
	}
  });
  
  Template.newRecipe.events({
	"submit .new-recipe": function (event) {
		var recipe = event.target.text.value;
		Meteor.call("addVineRecipe", recipe);
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
	},
	"submit .comment-vine": function (event) {
		event.preventDefault();
		var vineID=event.target.vine.value;
		var comment=event.target.comment.value;
		Meteor.call("addComment",vineID,comment);
		event.target.comment.value = "";
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
				authorID:Meteor.userId(),
				authorName:Meteor.user().username,
				likes:0,
				comments:[]
			});
		},
		likeVine: function (vineID) {
			Vines.update({
			_id: vineID}
			,{  $inc: {"likes":1}
			});
		},
		addComment: function (vineID,comment) {
			Vines.update({
			_id: vineID}
			,{ $addToSet: {comments: [comment] } });
		},
		addVineRecipe: function (recipe){
			Recipies.insert({
			authorID:Meteor.userId(),
			authorName:Meteor.user().username,
			recipe:recipe
			});
	}});

if (Meteor.isServer) {
  Meteor.publish("vines", function () {
    return Vines.find();
  });
  Meteor.publish("recipies", function () {
    return Recipies.find();
  });
  
  Meteor.startup(function(){
    Vines.remove({});
	Recipies.remove({});
});
}
