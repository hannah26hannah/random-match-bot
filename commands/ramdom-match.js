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
        const memberCount = interaction.guild.memberCount
        console.log('memberCount', memberCount)
        
        // TODO: need to get number of users excluding bot in the server
        // TODO: need to generate each pairs of random coffee chat group with 2-3 people
        // TODO: need to only send the message to the matched users
        
        
        await interaction.reply(`Matched with ${input} people! Check your DMs!`);
    }
   
}