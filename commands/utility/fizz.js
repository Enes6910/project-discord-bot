const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fizz')
		.setDescription('Replies with humide!'),
	async execute(interaction) {
		await interaction.reply('Humide!');
	},
};