const { SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js'); 

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Get information about yourself'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('I Acknowledge this')
                    .setStyle(ButtonStyle.Primary)
            );

        const content = `username: ${interaction.user.username}\nid: ${interaction.user.id}`;

        await interaction.reply({ content: content, components: [row] });
    }
};
