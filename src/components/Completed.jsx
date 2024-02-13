import React from 'react'

//here data is send to here props from parent
function Completed({list}) {
  return (
    <div className='mt-5 shadow'>
       
        <div>
            <p>{list.title}</p>
            <p>{list.description}</p>
        </div>
    </div>
  )
}

export default Completed