require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.TELEGRAM_BOT_TOKEN; // Replace with your actual token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Tap on the coin to earn tokens.');
});

bot.onText(/\/tap/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || 'unknown'; // Get Telegram username

  try {
    await axios.post(`${BACKEND_URL}/tap`, {
      chatId,
      username // Include username in the request
    });
    bot.sendMessage(chatId, 'Thank you for tapping! Your tap has been recorded.');
  } catch (error) {
    console.error('Error recording tap:', error);
    bot.sendMessage(chatId, 'Error recording tap. Please try again later.');
  }
});
