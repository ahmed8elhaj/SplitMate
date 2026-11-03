
let Membres = []
function getGroupMembers(groupId) {
    const groupMembers = Membres.filter(function (member) {
        return member.groupId === groupId;
    });

    return groupMembers;
}