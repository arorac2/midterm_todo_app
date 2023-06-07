require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const chat = async function(item) {
  const message = {
    role: "system",
    content: `You are a super smart computer that can identify if something is :
    Film / Series (To watch) with ID 1
    Restaurants, cafes, etc. (To eat) with ID 3
    Books (To read) with ID 4
    Products (To buy) are physical items you might buy at a store with ID 2
    Return only in json and do not include any other text in your reply. If the request is in multiple categories please include that.
    Do not add any more categories if something does not fit in to the above, instead please use the closest one.
    Return in the following format and please fix any spelling mistakes:
    {
      "item": "Lost",
      "category": ["Film / Series (To watch)"],
      "categoryId": [1]
    }
    If you cannot identify the object, return an empty array in the following format:
    {
      "item": "Harry",
      "category": [],
      "categoryId": []
    }
    `
  };

  const userMessage = {
    role: "user",
    content: item || "dog"
  };

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [message, userMessage],
  });


  return JSON.parse(response.data.choices[0].message.content);
};

module.exports = {chat};
