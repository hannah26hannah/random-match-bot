// get user list from the discord server and match them randomly

const { SlashCommandBuilder} = require('discord.js');
const { guildId } = require('../config.json')

module.exports = {

    data: new SlashCommandBuilder()
    .setName('ramdom-match')
    .setDescription('Match given number of random users for coffee chat')
    .addIntegerOption((option) =>
		option.setName('number-of-users')
			.setDescription('the number of users to match')),

    async execute(interaction) {
    
        // get user input from the interaction
        const input = interaction.options.getInteger("number-of-users")

        // the number of members in the server
        
        const totalMemberCount = interaction.guild.memberCount
        
        const humanMemberCount = interaction.guild.members.cache.filter(member => !member.user.bot).size
        
        console.log(`total : ${totalMemberCount}, human : ${humanMemberCount}`)
        
        
        // TODO: need to generate each pairs of random coffee chat group with 2-3 people
        // TODO: need to only send the message to the matched users
        
        
        await interaction.reply(`Matched with ${input} people! Check your DMs!`);
    }
   
}