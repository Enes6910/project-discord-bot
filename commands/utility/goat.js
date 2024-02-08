const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goat')
        .setDescription('Replies with SIIIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU!'),
    async execute(interaction) {
        await interaction.reply({
            content: 'SIIIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU!',
            files: ['https://c.tenor.com/WfB2PNMXY6AAAAAC/tenor.gif']
        });
    },
};