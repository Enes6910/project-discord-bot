const fs = require('fs');
const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomlol')
        .setDescription('Obtient un champion et un rôle aléatoire de League of Legends.')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo du joueur pour lequel le champion est choisi.')
                .setRequired(true)),
    async execute(interaction) {
        try {
            // Charger le fichier JSON des champions
            const championsData = fs.readFileSync('champions.json');
            const champions = JSON.parse(championsData).champions;

            // Sélectionner un champion aléatoire
            const randomChampion = champions[Math.floor(Math.random() * champions.length)];

            // Liste des rôles
            const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

            // Sélectionner un rôle aléatoire
            const randomRole = roles[Math.floor(Math.random() * roles.length)];

            const pseudo = interaction.options.getString('pseudo');

            // Choisir aléatoirement entre Nom_0.jpg et Nom_1.jpg
            const randomImageIndex = Math.random() < 0.5 ? 0 : 1;
            const randomImage = `${randomChampion}_${randomImageIndex}.jpg`;

            // Envoyer la réponse avec le pseudo du joueur, le champion aléatoire et le rôle aléatoire
            await interaction.reply({
                content: `Pseudo du joueur : <@${interaction.user.id}>\nPersonnage : ${randomChampion}\nRôle : ${randomRole}`,
                files: [`./champions/${randomImage}`] // Chemin de l'image aléatoire du champion
            });
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande randomlol :', error);
            await interaction.reply({
                content: 'Désolé, une erreur s\'est produite lors de l\'exécution de la commande.'
            });
        }
    },
};
