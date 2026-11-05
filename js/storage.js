const GROUPS_KEY="Groupe";
const DEPENSES_KEY="Depenses";
const MEMBERS_KEY="Membres";
function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLS(key,object) {
    localStorage.setItem(key, JSON.stringify(object))
}