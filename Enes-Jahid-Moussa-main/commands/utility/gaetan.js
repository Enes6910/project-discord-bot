const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gaetan')
		.setDescription('Replies with gaetan!'),
	async execute(interaction) {
        await interaction.reply({
            content: 'EL MANGOOOOOOOOOOOOOOOOO',
            files: ['https://i.redd.it/zc014st2axe51.png', 'https://oasis-sirop.com/img/intro/fruits/mangue.png']
        });
    },
};