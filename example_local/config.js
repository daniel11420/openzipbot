const config = {
    bot: {
        prefix: 'z!',
        token: 'Insert_Bot_Token_Here'
    },
    id: {
        server: 'ServerIdHere',
        owners: {
            host: 'daniels userid',
            zip: 'ziplaws userid'
        },
        rules: {
            channel: 'RulesChannelId',
            message: 'ReactionMessageId'
        },
        roles: {
            anarchyst: 'AnarchystRoleId',
            changelog: 'ChangelogRoleId',
            bone: 'BoneRoleId'
        },
        customerSupport: {
            channel1: 'Channel1Id',
            channel2: 'Channel2Id',
            text: 'Welcome to Customer Support. Before you post your question, please make sure to check if your question is already answered in <#622940713122005012>. Thank you!'
        }
    },
    configVersion: '3' // DO NOT TOUCH THIS!!!!!
};

module.exports = config;