const client = require("../index");
const { Collection } = require("discord.js")
const config = require("../config.json");
const Timeout = new Collection();
const ms = require("ms");

client.on("messageCreate", async (message) => {

        if(message.content.includes(`<@!Your Bot Id>`)) { 
          await message.channel.send("Hi there, my prefix defualt prefix is m!");
        }
         

    if (
        message.author.bot ||
        !message.guild ||
        
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )

   
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

        
        //make the const command to let command
    
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
        if (command) {

            
		if (command.cooldown) {
			if (Timeout.has(`${command.name}${message.author.id}`))
				return message.channel.send(
					`You are on a \`${ms(
						Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
						{ long: true }
					)}\` cooldown.`
				);
			command.run(client, message, args);
			Timeout.set(
				`${command.name}${message.author.id}`,
				Date.now() + command.cooldown
			);
			setTimeout(() => {
				Timeout.delete(`${command.name}${message.author.id}`);
			}, command.cooldown);
		} else
				    
            await command.run(client, message, args) 
        } 

  
    
    
    });
