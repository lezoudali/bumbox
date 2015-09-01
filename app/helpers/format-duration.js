import Ember from 'ember';

function formatDuration(seconds){
  var min = Math.floor(seconds/60).toString();
  var sec = "0" + (seconds % 60).toString();

  return min + ":" + sec.slice(-2);
}

export default Ember.Handlebars.makeBoundHelper(formatDuration);