const ipcRenderer = require('electron').ipcRenderer
const prepareText = require('../utils/prepare_text')

module.exports = function (app) {
  ipcRenderer.on('surfbird:get:direct-messages', function (e, message) {
    if (message.direct_message !== undefined) {
      message = message.direct_message
    }

    message.text_html = prepareText(message.text)

    if (!(JSON.stringify(app.direct_messages).indexOf(JSON.stringify(message)) > 0)) {
      app.direct_messages.unshift(message)
    }
  })

  ipcRenderer.on('surfird:hook:success:direct-message', function () {
    $('.js-compose-recipient').val('')
    $('.js-compose-message').val('')
    $('.js-compose-message-btn').attr('disabled', false)
  })

  ipcRenderer.on('surfird:hook:fail:direct-message', function () {
    $('.js-compose-message-btn').attr('disabled', false)
  })
}