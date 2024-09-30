import React from 'react'

function User({user,newTeamMembers,setnewTeamMembers}) {
    function clickHandler(e) {
        if (e.target.style.backgroundColor === 'red') {
            e.target.style.backgroundColor = 'black';
    
            const newArray = newTeamMembers.filter(member => member.id !== user._id);
            setnewTeamMembers(newArray);
        } else {
            e.target.style.backgroundColor = 'red';
            const obj={id:user._id,name:user.name}
            setnewTeamMembers([...newTeamMembers, obj]);
        }
    
        // console.log(newTeamMembers);
    }
    
  return (
    <div className="bg-gray-900 text-white font-bold p-2 rounded-md duration-200 cursor-pointer" onClick={clickHandler}>
        {user.name}
    </div>
  )
}

export default User;
