const { SlashCommandBuilder } = require('discord.js');

// Définir les valeurs des cartes
const cards = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11 // L'As peut valoir 1 ou 11, on le prendra comme 11 par défaut
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('Jouer au blackjack!'),
    async execute(interaction) {
        // Initialiser le jeu avec deux cartes pour chaque joueur (bot et joueur)
        const playerHand = [getRandomCard(), getRandomCard()];
        const botHand = [getRandomCard(), getRandomCard()];
        
        let playerTotal = calculateTotal(playerHand);
        let botTotal = calculateTotal(botHand);
        
        let message = `Votre main: ${playerHand.join(', ')} (Total: ${playerTotal})\nMain du bot: ${botHand[0]}, ?`;

        // Vérifier si l'un des joueurs a un blackjack (21 avec les deux premières cartes)
        if (playerTotal === 21 && botTotal !== 21) {
            message += "\nFélicitations, vous avez un blackjack! Vous avez gagné!";
            await interaction.reply(message);
            return;
        } else if (botTotal === 21 && playerTotal !== 21) {
            message += "\nDésolé, le bot a un blackjack. Vous avez perdu!";
            await interaction.reply(message);
            return;
        }

        await interaction.reply(message);
        
        // Attendre la réponse du joueur dans le chat
        const filter = m => m.author.id === interaction.user.id && ['hit', 'stand'].includes(m.content.toLowerCase());
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 }); // Temps limite d'une minute

        collector.on('collect', async message => {
            const content = message.content.toLowerCase();
            if (content === 'stand') {
                collector.stop('stand');
            } else if (content === 'hit') {
                const newCard = getRandomCard();
                playerHand.push(newCard);
                playerTotal = calculateTotal(playerHand);
                message = `Votre main: ${playerHand.join(', ')} (Total: ${playerTotal})\nMain du bot: ${botHand[0]}, ?`;
                if (playerTotal > 21) {
                    message += "\nVous avez dépassé 21! Vous avez perdu!";
                    collector.stop('busted');
                }
                await interaction.channel.send(message);
            }
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'stand') {
                // Le joueur a choisi de rester, maintenant le bot joue
                while (botTotal < 17) {
                    const newCard = getRandomCard();
                    botHand.push(newCard);
                    botTotal = calculateTotal(botHand);
                }

                message = `Votre main: ${playerHand.join(', ')} (Total: ${playerTotal})\nMain du bot: ${botHand.join(', ')} (Total: ${botTotal})`;
                if (botTotal > 21 || playerTotal > botTotal) {
                    message += "\nFélicitations, vous avez gagné!";
                } else if (botTotal > playerTotal) {
                    message += "\nDésolé, vous avez perdu!";
                } else {
                    message += "\nC'est une égalité!";
                }
                await interaction.channel.send(message);
            } else if (reason === 'time') {
                await interaction.channel.send("Le temps est écoulé. La partie est annulée.");
            }
        });
    },
};

// Fonction pour obtenir une carte aléatoire
function getRandomCard() {
    const cardKeys = Object.keys(cards);
    return cardKeys[Math.floor(Math.random() * cardKeys.length)];
}

// Fonction pour calculer le total des points d'une main
function calculateTotal(hand) {
    let total = 0;
    let numAces = 0;

    hand.forEach(card => {
        if (card === 'A') {
            numAces++;
        }
        total += cards[card];
    });

    // Si le total dépasse 21 et qu'il y a des As, réduire la valeur des As de 10 chacun jusqu'à ce que le total soit inférieur ou égal à 21
    while (total > 21 && numAces > 0) {
        total -= 10;
        numAces--;
    }

    return total;
}
