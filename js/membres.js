let Membres = readFromLS(MEMBERS_KEY);
const groupsPageList = document.getElementById("groups-page-list");
const addMemberform = document.getElementById("add-member-formuler");
const groupDetails = document.getElementById("group-details");
const btnAddMember = document.getElementById("add-member-btn");
const btnCancelform = document.getElementById("btnCancel-member-form");
const fullMemberInPut = document.getElementById("full-MemberInP");
const nickNameMemberInPut = document.getElementById("nickName-MemberInP");
const btnSaveMemberform = document.getElementById("btnSave-member-form");
const membersContainer = document.getElementById("members-container");

groupsPageList.addEventListener("click", (event) => {
  const btnopnGroup = event.target.closest("button");

let Membres = []
const groupsPageList = document.getElementById('groups-page-list');
const addMemberform = document.getElementById('add-member-formuler');
const groupDetails = document.getElementById('group-details');
const btnAddMember = document.getElementById('add-member-btn');
const btnCancelform = document.getElementById('btnCancel-member-form');
const fullMemberInPut = document.getElementById('full-MemberInP');
const nickNameMemberInPut = document.getElementById('nickName-MemberInP');
const btnSaveMemberform = document.getElementById('btnSave-member-form');
const membersContainer = document.getElementById('members-container')
const btnSaveModifierMember =document.getElementById('btnSaveModifier-member-form')


groupsPageList.addEventListener('click', (event) => {
  const btnopnGroup = event.target.closest('.open-group-button')
  selectedGroupId = btnopnGroup.dataset.id;
  affichierMembersgroup();
});

addMemberform.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    fullMemberInPut.value.trim() == "" ||
    nickNameMemberInPut.value.length == 0
  ) {
    return;
  }
  if (fullMemberInPut.value !== null || nickNameMemberInPut.value == null) {
    addMemberform.style.display = "none";
    alert("member add successfully !.");
  }

  createMember();
  affichierMembersgroup();

  console.log(Membres);

  fullMemberInPut.value = "";
  nickNameMemberInPut.value = "";
});

btnAddMember.addEventListener("click", () => {
  addMemberform.style.display = "block";
});

btnCancelform.addEventListener("click", () => {
  addMemberform.style.display = "none";
});

function createMember() {
  const member = {
    id: Date.now(),
    nom: fullMemberInPut.value,
    pseudo: "@" + nickNameMemberInPut.value,
    groupId: Number(selectedGroupId),
  };
  Membres.push(member);
  saveToLS(MEMBERS_KEY, Membres);
}

btnAddMember.addEventListener('click', () => {
  addMemberform.style.display = 'block';
  btnSaveMemberform.style.display='block';
  btnSaveModifierMember.style.display='none';

  fullMemberInPut.value = '';
  nickNameMemberInPut.value = '';
})
btnCancelform.addEventListener('click', () => {
  addMemberform.style.display = 'none';
})

addMemberform.addEventListener('submit', (event) => {
  event.preventDefault();

for(let member of Membres){
  if(member.nom ==fullMemberInPut.value ){
     alert("this name is already saved!");
      addMemberform.style.display = 'none';
     return;
  }
}

  if (fullMemberInPut.value.trim() == "" || nickNameMemberInPut.value.length == 0) { return; };
  if (fullMemberInPut.value !== null || nickNameMemberInPut.value !== null) {
    addMemberform.style.display = 'none';
    alert("member save successfully !.");
  }

 
  createMember()
  affichierMembersgroup()

   fullMemberInPut.value = '';
  nickNameMemberInPut.value = '';
})

function createMember() {

  const member = {
    id: Date.now(),
    nom: fullMemberInPut.value,
    pseudo: nickNameMemberInPut.value,
    groupId: selectedGroupId
  }
  
  Membres.push(member);
}

function affichierMembersgroup() {
  membersContainer.innerHTML = Membres.map((member) => {
    if (member.groupId !== selectedGroupId) {
      return;
    }
    console.log(member.groupId);
    console.log(selectedGroupId);

  membersContainer.innerHTML = Membres.map((member) => {
    if (member.groupId !== selectedGroupId)return;

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
                       <p class="text-xs text-slate-400 mt-1">@${member.pseudo}</p>
                     </div>
                     <div class="w-32">
                       <p class="text-xs text-slate-400">Total paid</p>
                       <p class="text-sm font-semibold text-slate-800">420.00 MAD</p>
                     </div>
                     <div class="w-32">
                       <p class="text-xs text-slate-400">Balance</p>
                       <p class="text-sm font-semibold text-red-600">-50.00 MAD</p>
                     </div>
            
                     <button  onclick="handleDelete(${member.id})" class="text-slate-400  px-2 hover:text-slate-700">
                       Delete
                     </button>

                      <button  onclick="handleModify(${member.id})" class="text-slate-400   hover:text-slate-700">
                       Modifier
                     </button>
                   </div> 
    
    `;
  });
}

function getGroupMembers(groupId) {
  const groupMembers = Membres.filter(function (member) {
    return member.groupId === groupId;
  });

  return groupMembers;
}

function getGroupMembers(groupId) {
  const groupMembers = Membres.filter(function (member) {
    return member.groupId === groupId;
  });

    `
  })


}



function handleModify(memberId) {

   addMemberform.style.display = 'block';
    btnSaveModifierMember.style.display = "block";
      btnSaveMemberform.style.display='none';

      for(let member of Membres){
   if (member.id == memberId) {
      fullMemberInPut.value = member.nom;
      nickNameMemberInPut.value=member.pseudo;
   } 
      }
    handleBtnModify(memberId)
}

function handleBtnModify(memberId){
  
   btnSaveModifierMember.addEventListener('click',(event)=>{
          event.preventDefault();
      for(let member of Membres){
   if (member.id == memberId) {
       member.nom=fullMemberInPut.value;
      member.pseudo=nickNameMemberInPut.value;
   } 
      }

     addMemberform.style.display = 'none';
  if (fullMemberInPut.value.trim() == "" || nickNameMemberInPut.value.length == 0) { return; };
  if (fullMemberInPut.value !== null || nickNameMemberInPut.value !== null) {
    addMemberform.style.display = 'none';
    // alert("member modifier successfully !."); 
  }
  affichierMembersgroup()
      })
}

function handleDelete(memberId) {
  const confirme = confirm('Are you sure you want to delete this member?');

  if (confirme) {
    Membres = Membres.filter((member) => member.id != memberId);
    affichierMembersgroup()
  }
}

function getGroupMembers(groupId) {
  const groupMembers = Membres.filter(function (member) {
    return member.groupId === groupId;
  });
  return groupMembers;
}
