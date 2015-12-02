var app = app || {};

app.PreferencesView = Backbone.View.extend({

  tagName: 'li',

  template: _.template( $('#topic-template').html() ),

  events: {
    'click .toggle': 'toggle'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    this.$input = this.$('.toggle');
    return this;
  },

  toggle: function() {
    var value = this.$input.prop('checked');
    this.model.save({ subscribed: value });
  }
});
