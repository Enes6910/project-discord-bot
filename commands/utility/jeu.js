const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('question')
        .setDescription('Poser une question au bot.'),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        try {
            const response = await axios.post('https://api.openai.com/v1/answers', {
                question: question,
                model: 'text-davinci-003', // Choisir le modèle GPT-3 approprié
                examples_context: 'I am a bot trained by OpenAI to answer questions.' // Contexte facultatif
            }, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json'
                }
            });

            const answer = response.data.answers[0];
            await interaction.reply(answer);
        } catch (error) {
            console.error('Error fetching answer from OpenAI:', error);
            await interaction.reply('Désolé, une erreur s\'est produite lors de la recherche de la réponse à votre question.');
        }
    },
};
