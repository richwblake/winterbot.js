const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

// had to remove avocado and coffee apple watch soccer ball 
const emojis = ['😁','😆','😅','🧐','🤪','🤩','🥳','😎','🥸','🤬',
    '🐋','🐊','🐣','🙊','🐨','🐱','🐶','🐸','🍎','🍊','🌽','🧀','🍕','🍥','🎂',
    '🧋','💻','📸','🎥','💎','✉️','✏️','📫',
    '🏀','🏈','🎾','🏐','🎱','🏓','⛸'];

const getRandomEmojis = () => {
    const randomEmojis = [];
    while (randomEmojis.length < 4) {
        const rand = Math.floor(Math.random() * emojis.length);
        if (!randomEmojis.includes(emojis[rand])) {
            randomEmojis.push(emojis[rand]);
        }
    }
    return randomEmojis;
};

const reactToMessageWithEmojis = (emojis, message) => {
    emojis.forEach(emoji => message.react(emoji));
};


module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creates polls with random reactions. Can only be used by instructor'),
    async execute(interaction) {
        //  const roleArr = interaction.guild.roles.cache.filter(role => role.name === 'winterbot');
        //  const role = Array.from(roleArr)[0][1];
        //  role.setPermissions([PermissionsBitField.Flags.MentionEveryone]);
        if (interaction.user.id === interaction.guild.ownerId) {
            const content = '@everyone';
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('The instructor has started a poll!')
                .setDescription('Please respond to the poll with one of the following reactions.')

            const message = await interaction.reply({ content, embeds: [embed], fetchReply: true });
            reactToMessageWithEmojis(getRandomEmojis(), message);
        } else {
            await interaction.reply({ ephemeral: true, content: 'You don\'t have permission to do that!' });
        }
    }
};
