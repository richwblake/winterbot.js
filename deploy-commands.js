const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildIds, TOKEN } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

for (const id of guildIds) {
    rest.put(Routes.applicationGuildCommands(clientId, id), { body: commands })
        .then(data => console.log(`Successfully registered ${data.length} application commands`))
        .catch(error => console.error(error));
}

