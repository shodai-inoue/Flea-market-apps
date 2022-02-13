window.onload = Main;

let goodsApp;
const baseURL = "http://localhost:3000/goods";

function Main() {
  goodsApp = new Vue({
    el: "#goodsApp",
    data: {
      input: "",
      title: "",
      image: "",
      price: "",
      explanation: "",
      category: "",
      fassion: "ファッション",
      appliances: "家電",
      books: "本・マンガ",
      necessities: "日用品",
      interior: "インテリア",
      other: "その他",
      number: "",
      goods: []
    },
    methods: {
      searchGoodByName: function(event) {
        let url = "?title_like=" + this.input;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchFassion: function(event) {
        let url = "?category_like=" + this.fassion;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchAppliances: function(event) {
        let url = "?category_like=" + this.appliances;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchBooks: function(event) {
        let url = "?category_like=" + this.books;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchNecessities: function(event) {
        let url = "?category_like=" + this.necessities;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchInterior: function(event) {
        let url = "?category_like=" + this.interior;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      searchOther: function(event) {
        let url = "?category_like=" + this.other;
        url = baseURL + encodeURI(url);
        updateData(url);
      },
      deleteEvent: function() {
        fetch(baseURL+'/'+this.number, {
          method: 'DELETE'
        }).then(function(res){
          fetch(baseURL, { method: 'GET' })
          .then(function(response){
            return response.json();
          })
          .then(function(res) {
            if(Array.isArray(res)) {
              goodsApp.goods = res;
              console.log(goodsApp.goods);
            }
            else {
              goodsApp.goods = [res];
            }
          });
        });
      },
      addEvent: function() {
        fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': this.title,
            'image': 'images/' + this.category + '.jpg',
            'price': this.price,
            'category': this.category,
            'explanation': this.explanation
          })
        }).then(function(res){
          fetch(baseURL, { method: 'GET' })
          .then(function(response){
            return response.json();
          })
          .then(function(res) {
            if(Array.isArray(res)) {
              goodsApp.goods = res;
              console.log(goodsApp.goods);
            }
            else {
              goodsApp.goods = [res];
            }
          });
        });
      }
    },
    mounted: function(event) {
      updateData(baseURL);
    }
  });
}

function updateData(url) {
  fetch(url, { method: 'GET' })
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    if(Array.isArray(res)) {
      goodsApp.goods = res;
      console.log(goodsApp.goods);
    }
    else {
      goodsApp.goods = [res];
    }
  });
}
//db.jsonの内容を書き換える機能 this.goods.splice(index, 1);
//db.jsonの内容を検索する機能
//120行以上
//Vueインスタンスのメソッド3つ以上
