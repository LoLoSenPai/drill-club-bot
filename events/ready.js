/* eslint-disable no-mixed-spaces-and-tabs */
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log('Connecting to database...');
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};