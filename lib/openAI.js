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
    Film / Series (To watch)
    Restaurants, cafes, etc. (To eat)
    Books (To read)
    Products (To buy)
    Return only in json and do not include any other text in your reply. If the request is in multiple categories please include that.
    Return in the following format:
    {
      "item": "Lost",
      "category": ["Film / Series (To watch)"]
    }
    If you cannot identify the object, return an empty array in the following format:
    {
      "item": "Harry",
      "category": []
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
