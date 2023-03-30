/**
 * @overview Match given number of random users for coffee chat
 */
const { SlashCommandBuilder} = require('discord.js');
// const { guildId } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('random-match')
    .setDescription('Match given number of random users for coffee chat')
    .addIntegerOption((option) =>
		option.setName('number-of-users')
            .setRequired(true)
			.setDescription('the number of users to match')),
            

    async execute(interaction) {
    
        // get user input from the interaction
        const input = interaction.options.getInteger("number-of-users")

        // get all member names
        const memberNames = interaction.guild.members.cache
        .filter(member => !member.user.bot) // filter out bots
        .map(member => member.user.username)

        const allMembers = interaction.guild.members.cache 
        .map(member => {
            return {
                id: member.user.id,
                name: member.user.username,
            }
        })

        const generateRandomKey = () => Math.floor(Math.random() * 1000);

        const membersWithKey = memberNames.map(name => ({
            name: name,
            key: generateRandomKey(),
        }));


        const sortResult = membersWithKey.sort((a, b) => {
            return a.key >= b.key ? 1 : -1;
        });
        
        const membersWithoutKey = sortResult.map(res => res.name);

        const teamResult = [];

        for (let i = 0; i < membersWithKey.length; i++) {
            const piece = [...membersWithoutKey].slice(i, i + input);
            teamResult.push(piece);

            i += input - 1;
        }
        
  
        let membersArray = [];

        teamResult.forEach((team, idx) => {
            const group = team.map(member => {
                const matchedMember = allMembers.find(m => m.name === member)
                return `<@${matchedMember.id}>`
            })
            membersArray.push(`group ${idx+1}: ${group.join('\n')}`)
        })
        
        
        await interaction.reply(`matched group of users: ${'\n'}${membersArray.join('\n')}`);
    }  
}