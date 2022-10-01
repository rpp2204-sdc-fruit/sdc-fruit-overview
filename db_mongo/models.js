const Products = require('./schema');

const checkDB = function() => {
  Products.count()
    .then(response => console.log(response) )
    .catch(error => console.log(error))
}