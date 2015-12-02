var app = app || {};

var TopicList = Backbone.Collection.extend({

  model: app.Topic,

  localStorage: new Backbone.LocalStorage('preferences-backbone'),

  subscribed: function() {
    return this.filter(function(topic) {
      return topic.get('subscribed');
    });
  },

  notSubscribed: function() {
    return this.without.apply(this, this.subscribed());
  },

  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function(topic) {
    return topic.get('order');
  }
});

app.Topics = new TopicList();
