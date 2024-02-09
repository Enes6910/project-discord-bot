const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagerandom')
        .setDescription('Affiche une image aléatoire de pied.'),
    async execute(interaction) {
        try {
            // Appel à l'API Unsplash pour récupérer une image aléatoire de Brawl Stars
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: {
                    query: 'feet',
                    client_id: 'W8Uj-9Zbc6sx4pdHnHUmhaSxVG1gZTVho66I1GxvkXM' // Remplace par ta propre clé d'accès Unsplash
                }
            });

            // Récupération de l'URL de l'image
            const imageUrl = response.data.urls.regular;

            // Envoi de l'image dans le canal où la commande a été utilisée
            await interaction.reply(imageUrl);
        } catch (error) {
            console.error('Error fetching feey image:', error);
            await interaction.reply('Désolé, une erreur s\'est produite lors de la récupération de l\'image de Brawl Stars.');
        }
    },
};
