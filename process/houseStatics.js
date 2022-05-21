let house_statics={
    democrats:[],
    republicans:[],
    independents:[],
    democrats_average_party:0,
    republicans_average_party:0,
    independents_average_party:0,
    most_engaged:[],
    least_engaged:[]
}
var houseMembers=houseDatos.results[0].members.filter(member =>member.total_votes != 0);

function saveHousePartyMember(party,caract)
{   house_statics[party]=houseMembers.filter(member =>member.party===caract)
}

saveHousePartyMember('democrats','D');
saveHousePartyMember('republicans','R');
saveHousePartyMember('independents','I');

function estimateHouseAverageVotes(party,membersVotes)
{
    house_statics[party].forEach(member =>{
        house_statics[membersVotes]=house_statics[membersVotes]+
                                    member.votes_with_party_pct/house_statics[party].length;
                                   
    })
}

estimateHouseAverageVotes('democrats','democrats_average_party');
estimateHouseAverageVotes('republicans','republicans_average_party');
estimateHouseAverageVotes('independents','independents_average_party');

function estimateEngagedMembers(votes, most,least)
{   houseMembers.sort((membermin,membermay)=>{
     if(membermin[votes]>membermay[votes])
        return 1;
    if(membermin[votes]<membermay[votes])
        return -1;
    return 0
    })
    for(let i=0; i < (Math.round(houseMembers.length*0.1));i++)
    {  house_statics[most].push(houseMembers[i])       }

    for(let j=houseMembers.length-1;  j > houseMembers.length -1 -(Math.round(houseMembers.length*0.1));j--)
    {  house_statics[least].push(houseMembers[j])  }
}
estimateEngagedMembers("missed_votes_pct", 'most_engaged','least_engaged')
