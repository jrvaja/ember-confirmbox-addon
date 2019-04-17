'use strict';

module.exports = {
  name: require('./package').name,
  included: function (app) {
    app.import('vendor/style.css');
  },
  contentFor: function (type) {
    if (type === 'head') {
      return '';
    } else if (type === 'head-footer') {
      return '';
    } else if (type === 'body') {
      return '';
    } else if (type === 'body-footer') {
      return '';
    }
  }
};
