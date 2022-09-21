const fs = require('node:fs');
const path = require('node:path');
const { REST, Client, GatewayIntentBits, Collection, PermissionsBitField } = require('discord.js');
const { TOKEN } = require('./config.json');

const createFilePathForDir = (dirName, callback) => {
    const filePath = path.join(__dirname, dirName);
    const files = fs.readdirSync(filePath).filter(file => file.endsWith('.js'));
    for (const file of files) {
        const jsFilePath = path.join(filePath, file);
        callback(jsFilePath);
    }
};

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

createFilePathForDir('commands', filePath => {
    const command = require(filePath);
    client.commands.set(command.data.name, command);
});

createFilePathForDir('events', filePath => {
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(TOKEN);
