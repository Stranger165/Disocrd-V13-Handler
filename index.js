const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config.json");
const chalk = require(`chalk`);


const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// install mongoose

mongoose
  .connect(config.mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log(
    chalk.cyan("[Information] ") + chalk.blue(`Connected to Mongodb`))
  )


// Initializing the project
require("./handler")(client);

client.login(client.config.token);
