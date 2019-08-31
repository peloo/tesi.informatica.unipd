const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxx/xxxxxxxxxxxxx';
const TOKEN = "xoxb-117197354337-xxxxxxxxxxxxx-12OEClhwYXKKaj5ulGEo3vCh";
const request = require('request');
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

class slacknotifyUtils {
    static sendNotify(channel, message) { }

    static async sendDirectlyNotify(member,MESSAGE){
        let CHANNEL;
        if(member.includes('@'))
            CHANNEL = member.replace('<@','').replace('>','');
        else
            CHANNEL = await getIdMember(member);

        return new Promise((resolve, reject) =>{
            request.post("https://slack.com/api/chat.postMessage?token=" + TOKEN + "&channel=" + CHANNEL + "&text=" + MESSAGE + "&pretty=1", function(error, response, body){
                if(error){
                    console.log("[slacknotifyUtils.sendDirectlyNotify]: $error",error);
                    reject(error);
                }
                else
                    resolve(body); 
            });
        })
    }

    static async addTag(toTag) { }
    static async listMembersApl(intent) { }
}

async function getIdMember(toTag) { }
function membersList() { }
module.exports = slacknotifyUtils;