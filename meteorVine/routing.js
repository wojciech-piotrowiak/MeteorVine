 Router.configure({
  layoutTemplate: 'bodyTemplate'
});

Router.route('/', function () {
 this.render('allVines', {to: 'internal'});
 } );
 
Router.route('/contact', function () {
 this.render('contact', {to: 'internal'});
 } );
 
Router.route('/recipies', function () {
 this.render('recipies', {to: 'internal'});
 } );
 
