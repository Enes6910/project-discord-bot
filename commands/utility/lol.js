const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomlol')
        .setDescription('Affiche un personnage aléatoire de League of Legends avec un rôle aléatoire.')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo du joueur.')
                .setRequired(true)),
    async execute(interaction) {
        const pseudo = interaction.options.getString('pseudo');

        try {
            // Liste des champions de League of Legends
            const champions = [
                'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe',
                'Aurelion Sol', 'Azir', 'Bard', 'Bel\'Veth', 'Blitzcrank', 'Brand', 'Braum', 'Briar', 'Caitlyn',
                'Camille', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko',
                'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar',
                'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Hwei', 'Illaoi', 'Irelia', 'Ivern', 'Janna',
                'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'K\'Santé', 'Kai\'Sa', 'Kalista', 'Karma', 'Karthus',
                'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw', 'LeBlanc',
                'Lee Sin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Maître Yi', 'Malphite', 'Malzahar',
                'Maokai', 'Milio', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Naafiri', 'Nami', 'Nasus', 'Nautilus',
                'Neeko', 'Nidalee', 'Nilah', 'Nocturne', 'Nunu et Willump', 'Olaf', 'Orianna', 'Ornn', 'Pantheon',
                'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rek\'Sai', 'Rell', 'Renata Glasc', 'Renekton',
                'Rengar', 'Riven', 'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Séraphine', 'Sett', 'Shaco',
                'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Smolder', 'Sona', 'Soraka', 'Swain', 'Sylas',
                'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle',
                'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'Koz',
                'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath',
                'Xin Zhao', 'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean', 'Zoé', 'Zyra'
            ];

            // Liste des rôles de League of Legends
            const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

            // Sélection aléatoire d'un champion et d'un rôle
            const randomChampion = champions[Math.floor(Math.random() * champions.length)];
            const randomRole = roles[Math.floor(Math.random() * roles.length)];

            // Construction de la réponse
            const response = `Pseudo du joueur : ${pseudo}\nPersonnage : ${randomChampion}\nRôle : ${randomRole}`;

            // Envoi de la réponse
            await interaction.reply(response);
        } catch (error) {
            console.error('Error fetching random LoL champion:', error);
            await interaction.reply('Désolé, une erreur s\'est produite lors de la récupération du personnage aléatoire de League of Legends.');
        }
    },
};
