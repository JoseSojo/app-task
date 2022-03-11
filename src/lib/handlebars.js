const { format } = require('timeago.js');

const helpers = {}

helpers.timeago = (timestamp) => {
  return format(timestamp);
}

helpers.isEqual = (a, b, opts) => {
  return a == b ? opts.fn('nav-link text-esp') : opts.inverse('nav-link link-simple');
}

module.exports = helpers;
