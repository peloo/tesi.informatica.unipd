const {google} = require('googleapis');
const googleCredentialToken = require('../googleAuthTokenCredential.json');
const googleCredentials = require('../credentials.json');

class gcalendarUtils{
    static async listEvents(idCalendar) {
        let now = new Date(); now.setHours(1);
        const iso_timeMin = now.toISOString();
        now.setHours(23);
        const iso_timeMax = now.toISOString();

        const auth = generateOAuth2Client();
        const calendar = google.calendar({
            version: 'v3',
            auth: auth
        });
        const events = await calendar.events.list({
            calendarId: idCalendar,
            timeMin: iso_timeMin,
            timeMax: iso_timeMax,
            maxResults: 15,
            singleEvents: true,
            orderBy: 'startTime',
        });
        return events.data.items;
    } 

    /* Pre: checkEvent riceve in ingresso un elenco di eventi, 
            il nome della visitatore e l'orario del evento. */
    static checkEvent(events, email_dipendente, nome_visitatore, orarioEvento){ }
    /* Post: ritornera' false se nessun vento e' presente in calendario, 
             ritornera' 1 se il visitatore indica l'orario corretto, 
             ritornera' 0 se il visitatore indica un orario errato ma comunque l'evento a lui associato esite. */
}
function generateOAuth2Client () {
    const { client_secret, client_id, redirect_uris } = googleCredentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(googleCredentialToken);
    return oAuth2Client;
}; 
module.exports = gcalendarUtils;

