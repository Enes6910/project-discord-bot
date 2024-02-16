const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides detailed information about the user.'),
	async execute(interaction) {
		const user = interaction.user;
		const member = interaction.member;

		const userInfo = `
Username: ${user.username}
Discriminator: ${user.discriminator}
User ID: ${user.id}
Avatar URL: ${user.displayAvatarURL({ dynamic: true })}
Joined Discord: ${user.createdAt}
Joined this server: ${member.joinedAt}
Roles: ${member.roles.cache.map(role => role.name).join(', ') || 'None'}
`;

		await interaction.reply(userInfo);
	},
};
