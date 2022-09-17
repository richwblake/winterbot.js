const { REST, Client, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./config.json');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    }
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const rest = new REST({ version: '10' }).setToken('token');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    console.log(interaction.guild);

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nMember count: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply('User info here');
    }
});

client.login(TOKEN);
