const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxx/xxxxxxxxxxxxx';
const TOKEN = "xoxb-117197354337-xxxxxxxxxxxxx-12OEClhwYXKKaj5ulGEo3vCh";
const request = require('request');
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

class slacknotifyUtils {
    static sendNotify(channel, message) {
        slack.send({
            link_names: 1,
            channel: channel,
            text: message
        }, function (err) {
            if (err) {
                console.log("[slacknotifyUtils.sendNotify]: API error:", err);
                throw err;
            } else {
                console.log("[slacknotifyUtils.sendNotify]: Slack notification sent!");
            }
        });
    }

    static async sendDirectlyNotify(member,MESSAGE){ }
    static async addTag(toTag) { }
    static async listMembersApl(intent) { }
}
async function getIdMember(toTag) { }
function membersList() { }
module.exports = slacknotifyUtils;