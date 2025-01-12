const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const margarita = {

      title: 'pizzaMargarita',
      level: 'Easy Peasy',
      ingredientes: ['Yeast', 'Water', 'Flour', 'Oil', 'Salt & Sugar'],
      cuisine: 'Mediterranean',
      dishType: 'main_course',
      image: 'https://www.recetasderechupete.com/wp-content/uploads/2017/01/pizza_margarita.jpg',
      duration: 45,
      creator: 'Giovanni Ranna',
      created: 10 / 11 / 2021,
    }

    return Recipe.create(margarita)
  })
  .then(() => Recipe.create(data))
  .then(allrecipes => console.log(`todas las recetas ${allrecipes}`))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(() => console.log("Success"))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => mongoose.Connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

