var app = app || {};

app.Topic = Backbone.Model.extend({

  defaults: {
    title: '',
    subscribed: false
  },

  toggle: function() {
    this.save({
      subscribed: !this.get('subscribed')
    });
  }
});
