const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feet')
        .setDescription('Affiche une image aléatoire de pied.'),
    async execute(interaction) {
        try {
            // Appel à l'API Unsplash pour récupérer une image aléatoire de pied
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: {
                    query: 'feet', // Requête spécifique pour rechercher des images de pied
                    client_id: 'YOUR_UNSPLASH_ACCESS_KEY' // Remplace par ta propre clé d'accès Unsplash
                }
            });

            // Récupération de l'URL de l'image
            const imageUrl = response.data.urls.regular;

            // Envoi de l'image dans le canal où la commande a été utilisée
            await interaction.reply(imageUrl);
        } catch (error) {
            console.error('Error fetching feet image:', error);
            await interaction.reply('Désolé, une erreur s\'est produite lors de la récupération de l\'image de pied.');
        }
    },
};
