const { ShardingManager } = require("discord.js");
const config = require("./config.json");
const chalk = require("chalk");

const manager = new ShardingManager(
	'./index.js',
	{
		totalShards: "auto",
		shardList: "auto",
		token: config.token,
	}
)

manager.on("shardCreate", async (shard) => {
	console.log(chalk.cyan("[Information] ") + chalk.blue(`${new Date()} Spawned ${shard.id}`))
})

manager.spawn()
