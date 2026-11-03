
let Membres = [];
// Membres = [
//     {
//         id: 1,
//         nom: "Ahmed",
//         pseudo: "ahmed",
//         groupId: 1
//     },
//     {
//         id: 2,
//         nom: "Sara",
//         pseudo: "sara",
//         groupId: 1
//     },
//     {
//         id: 3,
//         nom: "Youssef",
//         pseudo: "youssef",
//         groupId: 1
//     },
//     {
//         id: 4,
//         nom: "Amine",
//         pseudo: "amine",
//         groupId: 2
//     }
// ];

const addMemberform = document.getElementById('add-member-formuler');
const groupDetails = document.getElementById('group-details');
const btnAddMember = document.getElementById('add-member-btn');
const btnCancelform = document.getElementById('btnCancel-member-form');
const fullMemberInPut = document.getElementById('full-MemberInP');
const nickNameMemberInPut =document.getElementById('nickName-MemberInP');
const btnSaveMemberform =document.getElementById('btnSave-member-form');
const membersContainer = document.getElementById('members-container')

addMemberform.addEventListener('click',(event)=>{
    event.preventDefault();
})

btnAddMember.addEventListener('click',()=>{
    addMemberform.style.display='block';
})

btnCancelform.addEventListener('click',()=>{
     addMemberform.style.display='none';
})

btnSaveMemberform.addEventListener('click',()=>{

    if(fullMemberInPut.value.trim()=="" || nickNameMemberInPut.value.length == 0){return;};
    if(fullMemberInPut.value !== null || nickNameMemberInPut.value == null){
    addMemberform.style.display='none';
    alert("member add successfully !.");
    }

    const member={
         id: Date.now(),
         nom: fullMemberInPut.value,
         pseudo: `@${nickNameMemberInPut.value}`,
        //  groupId: null
    }

    Membres.push(member);
    affichierMembersgroup()
    
    console.log(Membres)

    fullMemberInPut.value='';
    nickNameMemberInPut.value='';

})


function affichierMembersgroup(){
   membersContainer.innerHTML = Membres.map((member)=>{
    return `
                   <div
                     class="flex flex-wrap items-center gap-4 p-5 border-b border-slate-100"
                   >
                     <div
                       class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-semibold"
                     >
                       ${getFirstLetterName(member.nom)}
                     </div>
                     <div class="flex-1">
                       <h3 class="text-sm font-semibold text-slate-800 data-id=${member.id}">
                         ${member.nom}
                       </h3>
                       <p class="text-xs text-slate-400 mt-1">${member.pseudo}</p>
                     </div>
                     <div class="w-32">
                       <p class="text-xs text-slate-400">Total paid</p>
                       <p class="text-sm font-semibold text-slate-800">420.00 MAD</p>
                     </div>
                     <div class="w-32">
                       <p class="text-xs text-slate-400">Balance</p>
                       <p class="text-sm font-semibold text-red-600">-50.00 MAD</p>
                     </div>
            
                     <button class="text-slate-400  px-2 hover:text-slate-700">
                       Delete
                     </button>

                      <button class="text-slate-400   hover:text-slate-700">
                       Modifier
                     </button>
                   </div> 
    
    `
   })
}

function getGroupMembers(groupId) {
    const groupMembers = Membres.filter(function (member) {
        return member.groupId === groupId;
    });

    return groupMembers;
}