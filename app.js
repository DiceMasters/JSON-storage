const dataURL = 'https://raw.githubusercontent.com/DiceMasters/JSON-storage/master/fort-json.json'

Vue.component('list-item', {
	props: ['primary_key', 'name', 'position', 'price', 'rating', 'comments'],
	template: '#list-item',
  mounted(){
  	let self = this
    
  	$('li.list-group-item').draggable({
      axis: 'x',
      revert: true,
      drag: function() {
      	var left = $(this).css('left').slice(0, -2)
        if ( (Number(left) < -100) || (Number(left) > 100) ){
        	return false
        }
      },
      stop: function(e, ui) {
      	if ( (ui.position.left < -100) || (ui.position.left > 100) ){
        	self.$root.delete( Number( $(this).attr('list-id') ) )
        }
      }
    })
  }
})

new Vue({
	el: '#application-main',
	data: {
		list: []
	},
	methods: {
		delete(listItem){
    	let deleteThis = confirm("Удалить из избранного?\nДанный специалист будет удален из ваших закладок")
      
      if (deleteThis){
      	this.list = this.list.filter( function(el){
          if (el.primary_key == Number(listItem)){
            return false
          }
          return true
        })
      }
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

