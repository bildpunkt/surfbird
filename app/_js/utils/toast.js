const toastr = require('toastr')

toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': true,
  'positionClass': 'toast-bottom-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '300',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'swing',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

module.exports = function (message, title, type) {
  toastr[type](message, title)
}
