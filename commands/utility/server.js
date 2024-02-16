const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides detailed information about the server.'),
	async execute(interaction) {
		const guild = interaction.guild;

		const serverInfo = `
Server Name: ${guild.name}
Server ID: ${guild.id}
Owner: ${guild.owner.user.tag} (${guild.ownerID})
Region: ${guild.region}
Created: ${guild.createdAt}
Members: ${guild.memberCount}
Channels: ${guild.channels.cache.filter(channel => channel.type === 'text' || channel.type === 'voice').size}
Roles: ${guild.roles.cache.size}
`;

		await interaction.reply(serverInfo);
	},
};
