module.exports = {
  users: {
    user: {
      email: "person@email.com",
      username: "RecipePerson",
      password: "complex_user_password",
    },
    user2: {
      email: "someguy@email.com",
      username: "SomeGuy",
      password: "some_cool_password",
    },
    user3: {
      email: "person2010@email.com",
      username: "2010User",
      password: "123456789",
    },
    user4: {
      email: "commentbot@fakemail.ch",
      username: "commentBot",
      password: "commentBotPassword",
    },
    user5: {
      email: "bloodborne@email.com",
      username: "BloodBorne",
      password: "IAMAGAMER",
    },
    user6: {
      email: "burneraccount@email.com",
      username: "BurnerAccount",
      password: "123456789",
    },
    invalidUser: {
      email: "OtherRecipePerson",
      username: "Wrong username format",
    },
  },
  recipes: {
    recipe: {
      title: "Fried rice",
      description: {
        ingridients: [
          { item: "rice", quantity: "500g" },
          { item: "cooking oil", quantity: "25ml" },
        ],
        directions: ["Boil the rice", "Fry the rice", "Enjoy"],
      },
    },
    recipe2: {
      title: "Boiled eggs",
      description: {
        ingridients: [
          { item: "eggs", quantity: "2" },
          { item: "water", quantity: "500ml" },
        ],
        directions: ["Put the eggs in water", "Boil the water", "Enjoy"],
      },
    },
    recipe3: {
      title: "Bread",
      description: {
        ingridients: [{ item: "money", quantity: "A lot of it" }],
        directions: [
          "Go to a bakery of your choice",
          "Buy a nice hot loaf",
          "Enjoy",
        ],
      },
    },
    recipe4: {
      title: "Kachumbali",
      description: {
        ingridients: [
          { item: "tomatoes", quantity: "3" },
          { item: "onions", quantity: "2" },
        ],
        directions: [
          "Cut the onions and tomatoes",
          "Put them on the same plate",
          "Enjoy",
        ],
      },
    },
    recipe5: {
      title: "Fried chicken",
      description: {
        ingridients: [
          { item: "chicken", quantity: "450g" },
          { item: "cooking oil", quantity: "500ml" },
          { item: "chilli", quantity: "100g" },
          { item: "bread crumbs", quantity: "900g" },
        ],
        directions: [
          "Marinate chicken in chilli",
          "Dip chicken in bread crumbs",
          "Fry the chicken",
          "Enjoy",
        ],
      },
    },
    recipe6: {
      title: "Vegan meal",
      description: {
        ingridients: [{ item: "nothing", quantity: "A lot" }],
        directions: ["You can't enjoy such a meal"],
      },
    },
    recipe7: {
      title: "Toast",
      description: {
        ingridients: [
          { item: "bread", quantity: "2 slices" },
          { item: "blueband", quantity: "enough" },
        ],
        directions: [
          "Smear the bread with blueband",
          "Put the bread in the toaster",
          "Enjoy",
        ],
      },
    },
    recipe8: {
      title: "Noodles",
      description: {
        ingridients: [
          { item: "noodles", quantity: "2 packs" },
          { item: "water", quantity: "500ml" },
        ],
        directions: ["Put the noodles in water", "Boil", "Add spices", "enjoy"],
      },
    },
    recipe9: {
      title: "Cereal",
      description: {
        ingridients: [
          { item: "cereal", quantity: "As much as is needed" },
          { item: "milk", quantity: "As much as is needed" },
        ],
        directions: ["You know what to do", "Enjoy"],
      },
    },
    invalidRecipe: {
      title: "Fried rice",
      description: {
        ingridients: [
          { item: "rice", quantity: "500g" },
          { item: "cooking oil", quantity: "25ml" },
        ],
      },
    },
  },
  comments: [
    { description: "This takes time" },
    { description: "How long does it take?" },
    { description: "Yeah, you're just bored" },
    { description: "Boom boom boom boom" },
    { description: "Wow, this is great stuff" },
    { description: "I came here from Twitter" },
  ],
};
