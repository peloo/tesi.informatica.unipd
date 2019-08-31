const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxx/xxxxxxxxxxxxx';
const TOKEN = "xoxb-117197354337-xxxxxxxxxxxxx-12OEClhwYXKKaj5ulGEo3vCh";
const request = require('request');
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

class slacknotifyUtils {
    static sendNotify(channel, message) { }
    static async sendDirectlyNotify(member,MESSAGE){ }

    static async addTag(toTag) { 
        let tagged = await getIdMember(toTag);
        
        if(tagged === false)
            tagged = toTag;
        else
            tagged = "<@" + tagged + ">";

        return tagged;
    }

    static async listMembersApl(intent) { }
}
async function getIdMember(toTag) { }
function membersList() { }
module.exports = slacknotifyUtils;