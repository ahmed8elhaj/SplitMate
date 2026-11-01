// Temporary members until US05 is completed
let Membres = [];
Membres = [
    {
        id: 1,
        nom: "Ahmed",
        pseudo: "ahmed",
        groupId: 1
    },
    {
        id: 2,
        nom: "Sara",
        pseudo: "sara",
        groupId: 1
    },
    {
        id: 3,
        nom: "Youssef",
        pseudo: "youssef",
        groupId: 1
    },
    {
        id: 4,
        nom: "Amine",
        pseudo: "amine",
        groupId: 2
    }
];



function getGroupMembers(groupId) {
    const groupMembers = Membres.filter(function (member) {
        return member.groupId === groupId;
    });

    return groupMembers;
}