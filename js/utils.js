
const avatarColors = [
    "bg-red-50 text-red-500",
    "bg-blue-50 text-blue-600",
    "bg-green-50 text-green-600",
    "bg-purple-50 text-purple-600",
    "bg-amber-50 text-amber-600",
    "bg-teal-50 text-teal-600"
];

function getRandomColor() {
    const color = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[color];
}
function getFirstLetterName(name) {
    const resultat = name.trim().split(/\s+/).splice(0, 2).map((word => word[0].toUpperCase())).join("");
    return resultat
}