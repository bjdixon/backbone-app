var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#preferencesapp',

  statsTemplate: _.template( $('#stats-template').html() ),

  events: {
    'click #toggle-all': 'toggleAllSubscribed'
  },

  initialize: function() {
    app.Topics.fetch();

    if (!app.Topics.length) {
      app.Topics.create({
        title: 'Newsletter',
        subscribed: true,
        order: app.Topics.nextOrder()
      });

      app.Topics.create({
        title: 'Offers',
        subscribed: false,
        order: app.Topics.nextOrder()
      });

      app.Topics.create({
        title: 'Service Alerts',
        subscribed: true,
        order: app.Topics.nextOrder()
      });

      app.Topics.create({
        title: 'Invoices',
        subscribed: true,
        order: app.Topics.nextOrder()
      });
    }

    this.allCheckbox = this.$('#toggle-all')[0];
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(app.Topics, 'all', this.render);
    app.Topics.fetch();
  },

  render: function() {
    var subscribed = app.Topics.subscribed().length;
    var notSubscribed = app.Topics.notSubscribed().length;

    if (app.Topics.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        subscribed: subscribed,
        numberOfTopics: subscribed + notSubscribed
      }));
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.addAll();

    this.allCheckbox.checked = !notSubscribed;
  },

  addOne: function(topic) {
    var view = new app.PreferencesView({ model: topic });
    $('#preferences-list').append(view.render().el);
  },

  addAll: function() {
    this.$('#preferences-list').html('');
      app.Topics.each(this.addOne, this);
  },

  toggleAllSubscribed: function() {
    var subscribed = this.allCheckbox.checked;

    app.Topics.each(function(topic) {
      topic.save({
        'subscribed': subscribed 
      });
    });
  }
});
