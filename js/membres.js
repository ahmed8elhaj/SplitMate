
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
    },
    {
        id: 5,
        nom: "Omar Idrissi",
        pseudo:"omar",
        groupId: 2
    },
    {
        id: 6,
        nom: "Salma Alaoui",
        pseudo:"salma",
        groupId: 2
    },
    {
        id: 7,
        nom: "Hamza Tazi",
        pseudo:"hamza",
        groupId: 2
    },
    {
        id: 8,
        nom: "Imane Fassi",
        pseudo:"imane",
        groupId: 3
    },
    {
        id: 9,
        nom: "Mehdi Berrada",
        pseudo:"mehdi",
        groupId: 3
    },
    {
        id: 10,
        nom: "Kawtar Mansouri",
        pseudo:"kawtar",
        groupId: 3
    }
];



function getGroupMembers(groupId) {
    const groupMembers = Membres.filter(function (member) {
        return member.groupId === groupId;
    });

    return groupMembers;
}