var TweetComponent = Vue.extend({
  props: ['content', 'index'],
  template: '<div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-if="content.retweeted_status === undefined"> \
              <div class="tweet-content"> \
                <div class="tweet-header"> \
                <img class="tweet-avatar" v-bind:src="content.user.profile_image_url"/> \
                {{ content.user.name }} <small>{{ content.user.screen_name}}</small></div> \
                <div class="tweet-body"> \
                  <div class="tweet-text">{{ content.text }}</div> \
                  <div class="tweet-media-wrapper media-{{ content.extended_entities.media.length }}" v-if="content.extended_entities !== undefined"> \
                    <div v-for="media in content.extended_entities.media" class="media-image" v-bind:style="{ backgroundImage: \'url(\' + media.media_url_https + \')\' }"></div> \
                  </div> \
                  <button class="reply">Reply</button> \
                  <button class="retweet">Retweet</button> \
                  <button class="favorite">Favorite</button> \
                </div> \
              </div> \
             </div> \
             <div class="tweet" data-tweet-id="{{ content.id_str }}" data-created-at="{{ content.created_at }}" data-username="{{ content.user.screen_name }}" v-else> \
              <div class="tweet-content"> \
                <div class="tweet-context">{{ content.user.name }} retweeted</div> \
                <div class="tweet-header"> \
                <img class="tweet-avatar" v-bind:src="content.retweeted_status.user.profile_image_url"/> \
                {{ content.retweeted_status.user.name }} <small>{{ content.retweeted_status.user.screen_name}}</small></div> \
                <div class="tweet-body"> \
                  <div class="tweet-text">{{ content.retweeted_status.text }}</div> \
                  <div class="tweet-media-wrapper media-{{ content.retweeted_status.extended_entities.media.length }}" v-if="content.retweeted_status.extended_entities !== undefined"> \
                    <div v-for="media in content.retweeted_status.extended_entities.media" class="media-image" v-bind:style="{ backgroundImage: \'url(\' + media.media_url_https + \')\' }"></div> \
                  </div> \
                  <button class="reply">Reply</button> \
                  <button class="retweet">Retweet</button> \
                  <button class="favorite">Favorite</button> \
                </div> \
              </div> \
             </div>'
})