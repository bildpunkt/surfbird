/*
 * matcher.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 *
 * This utility matches a string against the content of an array
 * most planned to be used for mute list comparisions
 *
 */

module.exports = function (string, array) {
  if( (new RegExp( '\\b' + array.join('\\b|\\b') + '\\b') ).test(string) ) {
    return true
  }
  else {
    return false
  }
}
