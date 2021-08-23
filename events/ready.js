const client = require('../index')
const chalk = require(`chalk`);
const arrayOfStatus = [
    'I AM BEST 🧩',
    'Join Support Server',
    'I like pizza',
    ', help',
    'Hard Working 🎃'
]

client.on('ready', () => {
    console.log(
        chalk.red("[Information] ") +
          chalk.blue(`${client.user.tag} is now online!`))
    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)]
            }],
            status: 'online',
            type: "WATCHING"
        
        })
    
    }, 5000)
})
