const fs = require('node:fs');
const path = require('node:path');
const { REST, Client, GatewayIntentBits, Collection } = require('discord.js');
const { TOKEN } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    console.log(event);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// client.once('ready', c => {
//     console.log(`Logged in as ${c.user.tag} and ready to go!`);
// });
// 
// client.on('interactionCreate', interaction => {
//     console.log(`${interaction.user.tag} in ${interaction.channel.name} triggered an interaciton!`);
// });
// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;
// 
//     const command = interaction.client.commands.get(interaction.commandName);
// 
//     if (!command) return;
// 
//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.log(error);
//         await interaction.reply({ content: 'An error occurred, sorry about that!', ephemeral: true });
//     }
// 
//     if (commandName === 'ping') {
//         await interaction.reply('Pong!');
//     } else if (commandName === 'server') {
//         await interaction.reply(`Server name: ${interaction.guild.name}\nMember count: ${interaction.guild.memberCount}`);
//     } else if (commandName === 'user') {
//         await interaction.reply(`Your username: ${interaction.user.username}\nYour user ID: ${interaction.user.id}`);
//     }
// });

client.login(TOKEN);
