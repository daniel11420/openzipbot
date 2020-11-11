const config = require('./local/config.js');
const token = config.bot.token;
const prefix = config.bot.prefix;

const discord = require('discord.js');
var client = new discord.Client();

var fs = require('fs');

var stats = { RemindedFaq: 0, BruhCounted: 0, RespectsCounted: 0, AnarchyLeft: 0, AnarchyJoined: 0, ChangelogLeft: 0, ChangelogJoined: 0, BoneRoleGiven: 0, JSONSavingErrors: 0 }

// Load list of people who've been reminded to read FAQ
var FaqReminded = JSON.parse(fs.readFileSync('./local/FaqReminded.json'));

function updateScreen() {
    console.log('\033[2J'); // Clear screen

    console.log("OpenZipbot is ready.");

    // Now printing the stats
    console.log('\r\n-- STATS -- READ stats.md');
    console.log(`RF: ${stats.RemindedFaq}    BC: ${stats.BruhCounted}    RC: ${stats.RespectsCounted}`);
    console.log(`A+: ${stats.AnarchyJoined}    A-: ${stats.AnarchyLeft}    JE: ${stats.JSONSavingErrors}`);
    console.log(`C+: ${stats.ChangelogJoined}    C-: ${stats.ChangelogLeft}    B+: ${stats.BoneRoleGiven}`);
    console.log('\r\n');

    // General info about bot
    console.log("Copyright (c) 2019-2020, daniel11420");
    console.log("github.com/daniel11420/OpenZipbot");
    console.log("Please read /LICENSE for licensing info.");
}

client.on('ready', () => {
    console.log('\033[2J'); // Clear screen

    // Update the screen
    updateScreen();
    updateScreen();

    // Set the status
    client.user.setPresence({ game: { name: 'https://go.zipcode.pw/ozb' }, status: 'online' })
        .then()
        .catch(console.error);
    
    // Storing the Rules reaction message in cache
    client.guilds.get(config.id.server).channels.get(config.id.rules.channel).fetchMessage(config.id.rules.message);
});

// Rules Reaction
client.on ("messageReactionAdd", (messageReaction, user) => {
    if (user.bot) return;
    if (messageReaction.message.channel.id == config.id.rules.channel) {
        if (messageReaction.message.id == config.id.rules.message) {
            client.guilds.get(config.id.server).members.get(user.id).addRole(config.id.roles.bone);
            stats.BoneRoleGiven = stats.BoneRoleGiven + 1;
            updateScreen();
        }
    }
});

// Customer Support FAQ reminder
client.on('typingStart', async (channel, user) => {
    if (user.bot) return;
    if (FaqReminded.includes(user.id)) return;
    if (channel.id == config.id.customerSupport.channel1) {
        embed = new discord.RichEmbed ()
            .setDescription(config.id.customerSupport.text)
            .setFooter(`To @${user.tag} | This message will be deleted in one minute. (unless an error occurs)`)
        var sentMessage = await channel.send(embed);
        FaqReminded.push(user.id);
        fs.writeFile('./local/FaqReminded.json', JSON.stringify(FaqReminded), function (err) {
            if (err) {
                client.users.get(config.id.owners.host).send("Error saving JSON for FAQ Reminder: ```" + err + "```")
                stats.JSONSavingErrors = stats.JSONSavingErrors + 1;
                updateScreen();
                return;
            }

            stats.RemindedFaq = stats.RemindedFaq + 1;
            updateScreen();
        });
        sentMessage.delete(60000);
    }
});



client.login(token);
