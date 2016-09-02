module.exports = function (event, content) {
  var n = {}

  switch (event.type) {
    case 'mention':
      n = {title: `@${content.user.screen_name} mentioned you`,
                 body: content.text,
                 icon: content.user.profile_image_url}
      break
    case 'retweet':
      n = {title: `@${content.source.screen_name} retweeted your tweet`,
                 body: content.target_object.text,
                 icon: content.source.profile_image_url}
      break
    case 'favorite':
      n = {title: `@${content.source.screen_name} liked your tweet`,
                 body: content.target_object.text,
                 icon: content.source.profile_image_url}
      break
    case 'follow':
      n = {title: `@${content.source.screen_name} followed you`,
                 body: content.source.description,
                 icon: content.source.profile_image_url}
      break
  }

  if (n.title !== undefined) {
    new Notification(n.title, {body: n.body, icon: n.icon, silent: true})
    document.getElementById('notification-tag').play()
  }
}
