const fs = require('node:fs')
const path = require('node:path')

require('dotenv').config();

const { TOKEN, GUILD_ID } = process.env;

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


// Create a new client instance
const client = new Client({ 
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ] });

client.commands = new Collection();


/**
 * fs 모듈을 사용하여 commands 폴더에 있는 모든 파일을 읽어온다.
 */
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath)
	
	// Set a new item in the Collection with the key as the command name and the value as the exported module

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	} 
	
	try {
		await command.execute(interaction);
	} catch(error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
})

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	
	try { 
		const guild = client.guilds.cache.get(GUILD_ID);
		await guild.members.fetch();
		
	} catch(error) {
		console.log('error while fetching the users', error)
	}
});

// Log in to Discord with your client's token
client.login(TOKEN);