League of Legends Discord Bot + Fun Commands
Project Overview
This Discord bot brings both utility and entertainment to your server. It includes a League of Legends Champion & Role Randomizer, along with several fun commands to keep the interaction lively, such as sending personalized compliments or triggering Cristiano Ronaldo's "SIIIUUUU" celebration.

Features
1. Random Champion & Role (Command: /randomlol)
Random Champion Selection: Chooses a random champion from a predefined list of League of Legends champions stored in a champions.json file.
Random Role Assignment: Randomly assigns one of the five main roles: Top, Jungle, Mid, ADC, or Support.
Champion Media Display: Based on the champion selected, the bot chooses either an image or a video and sends it to the chat. Certain champions have special videos.
2. Cristiano Ronaldo's "SIIIUUUU" (Command: /goat)
Fun Command: Sends Ronaldo’s famous celebration ("SIIIUUUUUUUUU!") with an accompanying gif.
3. Random Compliment Generator (Command: /compliment)
Compliment by Name: Takes a user-provided name and returns a personalized compliment from a predefined list.
Dynamic Compliments: A large array of compliments ensures a fresh response each time.
How It Works
Command: /randomlol
The bot listens for the /randomlol command.
A random champion is selected from a champions.json file.
A random role is assigned from one of the five League of Legends roles: Top, Jungle, Mid, ADC, or Support.
For specific champions, the bot selects either an image (jpg) or video (mp4) and sends it in response.
The player's username is tagged in the response for personalization.
Command: /goat
The bot sends the iconic "SIIIUUUUUUU" chant along with a gif of Ronaldo celebrating.
Command: /compliment
Users provide a name as an argument to the command.
The bot selects a random compliment from a predefined list and inserts the provided name into the compliment.
Installation

Clone the repository:
git clone https://github.com/yourusername/your-repo.git
cd your-repo

Install the necessary dependencies:
npm install

Make sure to have a champions.json file containing the list of available champions in the following format:
{
    "champions": ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Ezreal", "Miss Fortune", "Udyr", "Samira", "Seraphine", "Sona"]
}


Prepare the ./champions/ folder with images and videos. Example structure:
./champions/Ahri_0.jpg
./champions/Ahri_1.jpg
./champions/Ezreal_0.jpg
./champions/Ezreal_1.mp4

Run the bot:
node index.js

Usage:

Random Champion & Role:
Use /randomlol pseudo: your-username to get a random champion and role. Example response:
Pseudo du joueur : @PlayerName
Personnage : Ahri
Rôle : Mid

An image or video of the selected champion is also included.
Ronaldo's "SIIIUUUU":
Use /goat to trigger the Ronaldo celebration.

Compliment Generator:
Use /compliment name: your-friend's-name to send a compliment. Example response:
Your-friend's-name, you have a heart of gold.

Requirements:
Node.js
discord.js library
fs and axios modules
