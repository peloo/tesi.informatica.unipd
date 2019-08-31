async function getIdMember(toTag) {
    let tagged;
    let members = await membersList();
    let json_members = JSON.parse(members);

    /* do something */

    if (tagged === undefined)
        tagged = false;

    return tagged;
}