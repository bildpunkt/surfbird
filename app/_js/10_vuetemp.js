app.tweets = []

Vue.component('stream-item', TweetComponent)
Vue.component('loader', LoaderComponent)

var vm = new Vue({
    el: "#tweets",
    data: {
        tweets: app.tweets,
    },
})