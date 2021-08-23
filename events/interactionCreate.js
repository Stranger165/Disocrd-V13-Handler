const client = require("../index");
const config = require("../config.json");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        const userperm = interaction.member.permissions.has(cmd.userperm);

        if (!userperm) return interaction.followUp({content: `You need \`${cmd.userperm || []}\` Permissions` });

        const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({content: `I need \`${cmd.botperm || []}\` Permissions` });

       interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);

     

    }

       // Context Menu Handling
       if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
    
});
