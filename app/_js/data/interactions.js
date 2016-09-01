const ipcRenderer = require('electron').ipcRenderer
const prepareText = require('../utils/prepare_text')
const SurfNotification = require('../utils/notification')
var interactionsurf = false

module.exports = function (vm, app) {
  ipcRenderer.on('surfbird:get:interactions', function (e, interaction) {
    if (interaction.event.target_object !== undefined) {
      interaction.event.target_object.text_html = prepareText(interaction.event.target_object.text)
    }

    if (interaction.event.text !== undefined) {
      interaction.event.text_html = prepareText(interaction.event.text)
    }

    if (interaction.type === 'mention') {
      app.tweetStorage[interaction.event.id_str] = interaction.event
      vm.$set('tweetStorage', app.tweetStorage)
    }

    app.interactions.unshift(interaction)

    if (interactionsurf) {
      SurfNotification(interaction, interaction.event)
    }

      // skip the first 20 notifications, because we are pulling in 20 mentions from the beginning
    if (app.interactions.length > 19) {
      interactionsurf = true
    }
  })
}
