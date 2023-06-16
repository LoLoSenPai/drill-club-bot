/* eslint-disable no-undef */
const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rarity')
		.setDescription('Check the rarity of your Drill Club NFT')
		.addIntegerOption((option) =>
			option
				.setName('number')
				.setDescription('Which number ?')
				.setRequired(true),
		),

	async execute(interaction) {
		const numb = interaction.options.getInteger('number');

		const collection = require('../../rarity-checker/sorted_collection-drill-club.json');
		const TOTAL_NFTS = collection.length;
		const collectionImage = 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreiemnh35s7gy7b4xyhnq5efsnjp4k7qoqzxcmovao7j436pzwdqrhi.ipfs.nftstorage.link/';

		const nft_rank = collection.findIndex(
			(nft) => nft.name === `Drill Club #${numb}`,
		);
		// Utilisez maintenant la variable "nft_rank" pour afficher les informations correspondantes à la rareté demandée.

		if (nft_rank != -1) {
			let rarity;

			// Attribute a rarity rank
			if (nft_rank + 1 >= 0.6 * TOTAL_NFTS) {
				rarity = {
					value: 'common',
					image:
            '<:common1:1024082214926942288><:common2:1024082217309306951><:common3:1024082219507142757>',
					color: '#D1D1D1',
				};
			}
			else if (
				nft_rank + 1 >= 0.35 * TOTAL_NFTS && nft_rank + 1 < 0.6 * TOTAL_NFTS
			) {
				rarity = {
					value: 'uncommon',
					image:
            '<:uncommon1:1024082248879849522><:uncommon2:1024082250993774652><:uncommon3:1024082253489393705>',
					color: '#0BF54E',
				};
			}
			else if (
				nft_rank + 1 >= 0.15 * TOTAL_NFTS && nft_rank + 1 < 0.35 * TOTAL_NFTS
			) {
				rarity = {
					value: 'rare',
					image:
            '<:rare1:1024082242345111642><:rare2:1024082244698132570><:rare3:1024082246824644708>',
					color: '#0B8EF5',
				};
			}
			else if (
				nft_rank + 1 >= 0.05 * TOTAL_NFTS &&
        nft_rank + 1 < 0.15 * TOTAL_NFTS
			) {
				rarity = {
					value: 'epic',
					image:
            '<:epic1:1024082222103416874><:epic2:1024082224150220892><:epic3:1024082226767474739>',
					color: '#B20BF5',
				};
			}
			else if (
				nft_rank + 1 >= 0.01 * TOTAL_NFTS &&
        nft_rank + 1 < 0.05 * TOTAL_NFTS
			) {
				rarity = {
					value: 'legendary',
					image:
            '<:legendary1:1024082228839448647><:legendary2:1024082231267963030><:legendary3:1024082233625170062>',
					color: '#FF9900',
				};
			}
			else if (nft_rank + 1 >= 0 && nft_rank + 1 < 0.01 * TOTAL_NFTS) {
				rarity = {
					value: 'mythic',
					image:
            '<:mythik1:1099501852334239815><:mythik2:1099501854175539261><:mythik3:1099501855278645350>',
					color: '#F5340B',
				};
			}
			else {
				rarity = {
					value: 'Unregistred',
					image: '❌',
					color: '#FFFF',
				};
			}

			const rarityEmbed = new EmbedBuilder()
				.setColor(`${rarity.color}`)
				.setTitle(`${collection[nft_rank].name}`)
				.setURL(`https://magiceden.io/item-details/polygon/0x39cd103414106b922eb09c7d45df89608b59e887/${numb}`)
				.setAuthor({
					name: 'Rarity checker',
					iconURL: 'https://pbs.twimg.com/profile_images/1654933314132664323/XKp8j3o1_400x400.jpg',
					url: 'https://twitter.com/Ogronex',
				})
				.setThumbnail(
					`${collectionImage}`,
				)
				.addFields(
					{ name: '\u200B', value: '\u200B' },
					{
						name: `<a:winner:1099475849864040518>・Rank: ${nft_rank + 1}    ${rarity.image}`,
						value: '\u200B',
					},
				)
				.addFields({ name: `<a:rightarrow:1099475418400161823>・Supply: ${TOTAL_NFTS}`, value: '\u200B' })
				.setImage(`${collection[nft_rank].image}`)
				.setFooter({
					text: 'Tool powered by Ogronex',
					iconURL:
            'https://cdn3d.iconscout.com/3d/premium/thumb/polygon-matic-coin-6445027-5326787.png',
				});

			await interaction.reply({ embeds: [rarityEmbed] });
		}
		else {
			await interaction.reply({ content: `We can't find your NFT #${numb}` });
			console.log(`There is a problem with your NFT #${numb}`);
		}
	},
};
