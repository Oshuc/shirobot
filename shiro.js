const Discord = require('discord.js');
const auth = require('./auth.json');
const ytdl = require('ytdl-core');
const fs = require('fs');

const shiro = new Discord.Client();
//const broadcast = shiro
//	.createVoiceBroadcast()
//	.playFile('./video.mp3');
const f = fs.createWriteStream('video.mp3');

shiro.on('message', message => {
	if (!message.author.bot && message.content.toLowerCase() === 'hi') {
		message.channel.send('hi')
	}
});

shiro.on('message', message => {
	if (!message.author.bot && message.content.toLowerCase() === '$join') {
		message.member.voiceChannel.join()
			.then(connection => message.channel.send('Connected'));
			//.(message.channel.send('Unable to connect'));
	}
});

shiro.on('message', message => {
	if (!message.author.bot && message.content.substring(0,6).toLowerCase() === '$play ') {
		ytdl(message.content.substring(6), { filter: 'audioonly'})
			.pipe(f);
		f.on('finish', function() {
			shiro.createVoiceBroadcast()
				.playFile('./video.mp3');
		});
	}
});

shiro.login(auth.token);
