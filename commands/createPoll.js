const { writeInteractionToFile } = require('../wrxLogFile.js');
const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

// had to remove avocado and coffee apple watch soccer ball 
const emojis = ['😁','😆','😅','🧐','🤪','🤩','🥳','😎','🥸','🤬',
    '🐋','🐊','🐣','🙊','🐨','🐱','🐶','🐸','🍎','🍊','🌽','🧀','🍕','🍥','🎂',
    '🧋','💻','📸','🎥','💎','✉️','✏️','📫',
    '🏀','🏈','🎾','🏐','🎱','🏓','⛸'];

let currentScore = { primary: 0, primary2: 0, primary3: 0, primary4: 0 };
let randomEmojis = [];
let respondedUsers = [];

const getRandomEmojis = () => {
    const randomEmojis = [];
    let used_indices = [];
    let count = 1;
    while (randomEmojis.length < 4) {
        const rand = Math.floor(Math.random() * emojis.length);
        if (!used_indices.includes(rand)) {
            randomEmojis.push(`${emojis[rand]} - Choice ${count++}`);
            used_indices.push(rand);
        }
    }
    return randomEmojis;
};

const createEmbed = (color, title, desc) => {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(desc);
};

const createButton = (type, label, style) => {
    return new ButtonBuilder()
        .setCustomId(`$Math.floor(Math.random() * 1000)}`)
        .setLabel(label)
        .setStyle(style);
};

const calculateScore = i => {
    if (currentScore[i.customId])
        currentScore[i.customId] += 1;
    else
        currentScore[i.customId] = 1;
    
    const formatted = `Choice 1: ${currentScore['primary']}\nChoice 2: ${currentScore['primary2']}\nChoice 3: ${currentScore['primary3']}\nChoice 4: ${currentScore.primary4}`

    return formatted;    
};

const formatScore = () => {
    return `Choice 1: ${currentScore['primary']}\nChoice 2: ${currentScore['primary2']}\nChoice 3: ${currentScore['primary3']}\nChoice 4: ${currentScore.primary4}`
};

const handleButtonPress = (interaction, message, content, row) => {
    const filter = i => !respondedUsers.includes(i.user.id);

    const collector = message.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        respondedUsers.push(i.user.id);
        const embed = createEmbed(0x0099FF, "Current running score:", calculateScore(i));
        await i.update({ embeds: [embed] });
    });

    collector.on('end', collected => {
        interaction.followUp(`**Final Score:**\n${formatScore()}`);
        currentScore = { primary: 0, primary2: 0, primary3: 0, primary4: 0 };
        respondedUsers = [];
    });
};


module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creates polls with random reactions. Can only be used by instructor'),
    async execute(interaction) {
        writeInteractionToFile(JSON.stringify(interaction.user));

        if (interaction.user.id === interaction.guild.ownerId) {
            const content = '@everyone';
            const embed = createEmbed(0x0099FF, 
                'The instructor has started a poll!', 
                'Please respond to the poll with one of the following reactions.');

            randomEmojis = getRandomEmojis();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel(randomEmojis[0])
                    .setCustomId('primary')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('primary2')
                    .setLabel(randomEmojis[1])
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('primary3')
                    .setLabel(randomEmojis[2])
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('primary4')
                    .setLabel(randomEmojis[3])
                    .setStyle(ButtonStyle.Primary),
                );

            const message = await interaction.reply({ content, 
                components: [row],
                embeds: [embed],
                fetchReply: true
            });

            handleButtonPress(interaction, message, content, row, embed);

        } else {
            await interaction.reply({ ephemeral: true, content: 'You don\'t have permission to do that!' });
        }
    }
};

















