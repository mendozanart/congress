let senateTable = document.getElementById("senateData");
let senateMembers = senateDatos.results[0].members;
let select_states = document.getElementById('states');
let filter_states=[];
let filter_members=[];
let filter_party=[];
let statesAll='all';
let party_checkboxes=document.getElementsByName('party');
console.log(senateMembers);
function filterOfMembers()
{
    if(filter_party.length===0)
    { filter_members=senateMembers;}
    else
    {filter_members=[];
       senateMembers.forEach(member => {
          if(member.party ==='D' && filter_party.includes('D') )
          {
              filter_members.push(member)              
          }
          else
          if(member.party ==='R' && filter_party.includes('R') )
          {
              filter_members.push(member)              
          }
          else
          if(member.party ==='I' && filter_party.includes('I') )
          {
              filter_members.push(member)              
          }
       })    
    }
    if(statesAll==='all')
    { filter_members=filter_members; 
    }
    else{
        filter_members=filter_members.filter(member => member.state===statesAll)
    }
}
function createTable()
{ senateTable.innerHTML = ''
  filterOfMembers()
  filter_members.forEach(member => {
    let item=document.createElement('tr')
    item.innerHTML = `<td><a target='_blank' href='${member.url}'>${member.first_name} 
                     ${member.last_name}</a></td>
                     <td>${member.party}</a></td>   
                     <td>${member.state}</a></td>  
                     <td>${member.seniority}</a></td>  
                     <td>${member.total_votes}</a></td>`  
                     senateTable.appendChild(item)  
   })
}

senateMembers.forEach(member => 
    { if(!filter_states.includes(member.state))
        {  filter_states.push(member.state)
        }
    })

filter_states.sort();

filter_states.forEach(state => {
    let option = document.createElement('option')
    option.innerHTML = state
    option.value=state
    select_states.appendChild(option)
})

party_checkboxes.forEach(checkbox =>{
    checkbox.addEventListener('change',(event) =>{
        let checkboxSel  = event.target.value
        let checkLiber = event.target.checked
        if(filter_party.includes(checkboxSel) && !checkLiber)
        {
            filter_party=filter_party.filter(party => party !== checkboxSel)
        }
        else if(!filter_party.includes(checkboxSel) && checkLiber)
        { filter_party.push(checkboxSel)
        }
        createTable();
    })
})
select_states.addEventListener('change', (event)=>{
    let sel_state=event.target.value
    statesAll=sel_state
    createTable();
})
createTable();
