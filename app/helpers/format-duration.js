import Ember from 'ember';

function formatDuration(duration){
  var minutes = Math.floor(duration/60),
      seconds = "0" + (duration % 60);

  return minutes + ":" + seconds.slice(-2);
}

export default Ember.Handlebars.makeBoundHelper(formatDuration);