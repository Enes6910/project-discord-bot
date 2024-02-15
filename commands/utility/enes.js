const { SlashCommandBuilder } = require('discord.js');

// Tableau de compliments sur Enes
const compliments = [
    'Enes, tu as un cœur généreux.',
    'Ta gentillesse illumine chaque pièce, Enes.',
    'Ton optimisme est contagieux, Enes.',
    'Enes, tu es une inspiration pour nous tous.',
    'Tes efforts incroyables ne passent jamais inaperçus, Enes.',
    'Enes, tu possèdes une perspicacité remarquable.',
    'Ton travail acharné est vraiment admirable, Enes.',
    'Enes, tu as une capacité innée à motiver les autres.',
    'Ta détermination est vraiment impressionnante, Enes.',
    'Enes, tu es une personne vraiment exceptionnelle.',
    'Ta créativité est une véritable inspiration, Enes.',
    'Enes, tu apportes toujours une énergie positive.',
    'Ton intelligence est véritablement remarquable, Enes.',
    'Enes, tu as un talent unique pour résoudre les problèmes.',
    'Ta compassion envers les autres est vraiment touchante, Enes.',
    'Enes, tu es une personne vraiment digne de confiance.',
    'Ta volonté inébranlable est incroyable, Enes.',
    'Enes, tu possèdes une sagesse bien au-delà de ton âge.',
    'Ton humour rend chaque jour plus lumineux, Enes.',
    'Enes, tu es un modèle pour nous tous.',
    'Ta capacité à voir le meilleur chez les autres est admirable, Enes.',
    'Enes, tu as un esprit véritablement brillant.',
    'Ton intégrité est quelque chose que nous admirons tous, Enes.',
    'Enes, tu es vraiment un joyau rare.',
    'Ton dévouement envers tes objectifs est inspirant, Enes.',
    'Enes, tu possèdes une ténacité inégalée.',
    'Ton éthique de travail est vraiment exemplaire, Enes.',
    'Enes, tu es une personne sur qui on peut compter en toute circonstance.',
    'Ta modestie te rend encore plus admirable, Enes.'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enes')
        .setDescription('Replies with compliments sur enes'),
    async execute(interaction) {
        // Sélection aléatoire d'un compliment dans le tableau
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const randomCompliment = compliments[randomIndex];
        await interaction.reply(randomCompliment);
    },
};
