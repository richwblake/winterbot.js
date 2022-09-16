const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    }
];

const rest = new REST({ version: '10' }).setToken('token');

(async () = {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: comamnds });

        console.log('Successfully reloaded application (/) commands');
    } catch (error) {
        console.error(error);
    }
})();