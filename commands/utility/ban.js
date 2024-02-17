import discord
from discord.ext import commands
from discord.utils import get

bot = commands.Bot(command_prefix='/')

@bot.command()
async def votedeco(ctx, member: discord.Member):
    # Vérification si l'auteur de la commande est dans un salon vocal
    if ctx.author.voice is None or ctx.author.voice.channel is None:
        await ctx.send("Vous devez être dans un salon vocal pour utiliser cette commande.")
        return

    # Vérification si le membre mentionné est dans un salon vocal
    if member.voice is None or member.voice.channel is None:
        await ctx.send("La personne que vous souhaitez déconnecter doit être dans un salon vocal.")
        return

    # Création de l'embed pour le vote
    embed = discord.Embed(title=f"Vote pour déconnecter {member.display_name} du salon vocal", color=0x00ff00)
    embed.add_field(name="Réagissez avec 👍 pour déconnecter", value="Réagissez avec 👎 pour ne pas déconnecter", inline=False)
    message = await ctx.send(embed=embed)
    await message.add_reaction('👍')
    await message.add_reaction('👎')

    # Fonction de vérification des réactions
    def check(reaction, user):
        return user == ctx.author and str(reaction.emoji) in ['👍', '👎']

    # Attente des réactions
    try:
        reaction, _ = await bot.wait_for('reaction_add', timeout=30.0, check=check)
    except TimeoutError:
        await ctx.send("Temps écoulé, vote annulé.")
        return

    # Vérification du résultat du vote
    if reaction.emoji == '👎':
        await ctx.send("Vote contre, la personne ne sera pas déconnectée.")
        return

    # Récupération des votes des autres membres
    reactions = message.reactions
    yes_votes = reactions[0].count - 1  # soustraire le bot qui a réagi
    no_votes = reactions[1].count - 1

    if yes_votes <= no_votes or yes_votes < 3:
        await ctx.send(f"Il n'y a pas assez de votes pour déconnecter {member.display_name}.")
        return

    # Remettre un vote pour la durée de bannissement
    embed.clear_fields()
    embed.add_field(name="Vote pour la durée de la déconnexion", value="Réagissez avec les emojis correspondant à la durée souhaitée", inline=False)
    embed.add_field(name="5️⃣", value="5 minutes", inline=True)
    embed.add_field(name="🔟", value="10 minutes", inline=True)
    embed.add_field(name="1️⃣5️⃣", value="15 minutes", inline=True)
    embed.add_field(name="3️⃣0️⃣", value="30 minutes", inline=True)
    embed.add_field(name="6️⃣0️⃣", value="1 heure", inline=True)

    await message.edit(embed=embed)

    # Ajouter les réactions pour la durée de bannissement
    await message.add_reaction('5️⃣')
    await message.add_reaction('🔟')
    await message.add_reaction('1️⃣5️⃣')
    await message.add_reaction('3️⃣0️⃣')
    await message.add_reaction('6️⃣0️⃣')

    # Fonction de vérification des réactions pour la durée de bannissement
    def check_duration(reaction, user):
        return user == ctx.author and str(reaction.emoji) in ['5️⃣', '🔟', '1️⃣5️⃣', '3️⃣0️⃣', '6️⃣0️⃣']

    # Attente des réactions pour la durée de bannissement
    try:
        reaction, _ = await bot.wait_for('reaction_add', timeout=30.0, check=check_duration)
    except TimeoutError:
        await ctx.send("Temps écoulé, vote pour la durée de la déconnexion annulé.")
        return

    # Calcul de la durée de bannissement en secondes
    duration = 0
    if reaction.emoji == '5️⃣':
        duration = 300
    elif reaction.emoji == '🔟':
        duration = 600
    elif reaction.emoji == '1️⃣5️⃣':
        duration = 900
    elif reaction.emoji == '3️⃣0️⃣':
        duration = 1800
    elif reaction.emoji == '6️⃣0️⃣':
        duration = 3600

    # Déconnexion du membre du salon vocal pour la durée spécifiée
    await member.move_to(None)
    await ctx.send(f"{member.display_name} a été déconnecté du salon vocal pour {duration // 60} minutes.")

    # Attendre la fin de la durée de bannissement
    await asyncio.sleep(duration)

    # Renvoyer le membre dans le salon vocal d'où il a été déconnecté
    await member.move_to(ctx.author.voice.channel)
    await ctx.send(f"{member.display_name} est de retour dans le salon vocal.")

bot.run(MTIwNTA2ODMwNzQxNDI1Nzc3NQ.G3m7Ez.5aVcYCqwL-BKj3UUOMWYJeYHNNDtM2Xef_OvRs)
