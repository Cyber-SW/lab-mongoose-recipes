const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return
  })

async function handleRecipes() {
  try {
    await Recipe.deleteMany()
    const tomatoRecipe = await Recipe.create({
      title: "Tomato Sauce",
      level: "Amateur Chef",
      ingredients: ["Tomato", "Sauce"],
      cuisine: "Italian",
      dishType: "soup",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: "Shawn",
      created: 04/14/2023
    })
    console.log(tomatoRecipe.title)
    const manyRecipes = await Recipe.insertMany(data)
    manyRecipes.forEach((recipe) => {
      console.log(recipe.title)
    })
    const updatedRecipe = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
    console.log(`Success! Duration set to: ${updatedRecipe.duration}`)
    const removeCake = await Recipe.deleteOne({ title: "Carrot Cake" })
    console.log(`Success! ${removeCake}`)
  }
  catch (error) { console.error("Error connecting to the database", error) }
  finally { mongoose.connection.close() }
}

handleRecipes()





  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   return Recipe.create({
  //     title: "Tomato Sauce",
  //     level: "Amateur Chef",
  //     ingredients: ["Tomato", "Sauce"],
  //     cuisine: "Italian",
  //     dishType: "soup",
  //     image: "https://images.media-allrecipes.com/images/75131.jpg",
  //     duration: 20,
  //     creator: "Shawn",
  //     created: 04 / 14 / 2023,
  //   });
  // })
  // .then((createdRecipe) => {
  //   console.log(createdRecipe.title);
  //   return Recipe.insertMany(data);
  // })
  // .then((createdRecipes) => {
  //   createdRecipes.forEach((recipe) => {
  //     console.log(recipe.title);
  //   });
  //   return Recipe.findOneAndUpdate(
  //     { title: "Rigatoni alla Genovese" },
  //     { duration: 100 },
  //     { new: true }
  //   );
  // })
  // .then((updatedRigatoniRecipe) => {
  //   console.log(updatedRigatoniRecipe.duration)
  // })
  // .catch((error) => {
  //   console.error("Error connecting to the database", error);
  // });
