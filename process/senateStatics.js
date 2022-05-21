let senate_statics={
    democrats:[],
    republicans:[],
    independents:[],
    democrats_average_party:0,
    republicans_average_party:0,
    independents_average_party:0,
    most_engaged:[],
    least_engaged:[]
}
let senateMembers=senateDatos.results[0].members.filter(member =>member.total_votes != 0);
function saveSenatePartyMember(party,caract)
{   senate_statics[party]=senateMembers.filter(member =>member.party===caract)
}

saveSenatePartyMember('democrats','D');
saveSenatePartyMember('republicans','R');
saveSenatePartyMember('independents','I');


function estimateSenateAverageVotes(party,membersVotes)
{
    senate_statics[party].forEach(member =>{
        senate_statics[membersVotes]=senate_statics[membersVotes]+
                                    member.votes_with_party_pct/senate_statics[party].length;
                                   
    })
}

estimateSenateAverageVotes('democrats','democrats_average_party');
estimateSenateAverageVotes('republicans','republicans_average_party');
estimateSenateAverageVotes('independents','independents_average_party');

function estimateEngagedMembers(votes, most,least)
{   senateMembers.sort((membermin,membermay)=>{
     if(membermin[votes]>membermay[votes])
        return 1;
    if(membermin[votes]<membermay[votes])
        return -1;
    return 0
    })
    for(let i=0; i < (Math.round(senateMembers.length*0.1));i++)
    {  senate_statics[most].push(senateMembers[i])       }

    for(let j=senateMembers.length-1;  j > senateMembers.length -1 -(Math.round(senateMembers.length*0.1));j--)
    {  senate_statics[least].push(senateMembers[j])  }
}
estimateEngagedMembers("missed_votes_pct", 'most_engaged','least_engaged')
