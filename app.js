const dataURL = 'https://github.com/DiceMasters/JSON-storage/raw/master/fort-json.json'

Vue.component('list-item', {
	props: ['name', 'position', 'price', 'rating', 'commentsCount'],
  template: '#list-item'
})

new Vue({
	el: '#application-main',
  data: {
  	list: []
  },
  methods: {
  	delete(listItem){
    	 
    }
  },
  created(){
  	var self = this
    
    fetch(dataURL)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        self.list = data
      })
      .catch(function(error){
      	console.log(error)
      })
  }
})