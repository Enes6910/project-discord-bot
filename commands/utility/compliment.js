const { SlashCommandBuilder } = require('discord.js');

// Tableau de compliments sur le prénom
const compliments = [
    '{name}, tu as un cœur généreux.',
    'Ta gentillesse illumine chaque pièce, {name}.',
    'Ton optimisme est contagieux, {name}.',
    '{name}, tu es une inspiration pour nous tous.',
    'Tes efforts incroyables ne passent jamais inaperçus, {name}.',
    '{name}, tu possèdes une perspicacité remarquable.',
    'Ton travail acharné est vraiment admirable, {name}.',
    '{name}, tu as une capacité innée à motiver les autres.',
    'Ta détermination est vraiment impressionnante, {name}.',
    '{name}, tu es une personne vraiment exceptionnelle.',
    'Ta créativité est une véritable inspiration, {name}.',
    '{name}, tu apportes toujours une énergie positive.',
    'Ton intelligence est véritablement remarquable, {name}.',
    '{name}, tu as un talent unique pour résoudre les problèmes.',
    'Ta compassion envers les autres est vraiment touchante, {name}.',
    '{name}, tu es une personne vraiment digne de confiance.',
    'Ta volonté inébranlable est incroyable, {name}.',
    '{name}, tu possèdes une sagesse bien au-delà de ton âge.',
    'Ton humour rend chaque jour plus lumineux, {name}.',
    '{name}, tu es un modèle pour nous tous.',
    'Ta capacité à voir le meilleur chez les autres est admirable, {name}.',
    '{name}, tu as un esprit véritablement brillant.',
    'Ton intégrité est quelque chose que nous admirons tous, {name}.',
    '{name}, tu es vraiment un joyau rare.',
    'Ton dévouement envers tes objectifs est inspirant, {name}.',
    '{name}, tu possèdes une ténacité inégalée.',
    'Ton éthique de travail est vraiment exemplaire, {name}.',
    '{name}, tu es une personne sur qui on peut compter en toute circonstance.',
    'Ta modestie te rend encore plus admirable, {name}.'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Replies with compliments sur enes')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the person to compliment')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        // Sélection aléatoire d'un compliment dans le tableau et remplacement de {name} par le nom donné
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const randomCompliment = compliments[randomIndex].replace('{name}', name);
        await interaction.reply(randomCompliment);
    },
};
