import React from 'react';
import photo from '../../assets/Complaints.jpg'

const Report = () => {
    return (
<div>
       <h2 className='text-primary text-3xl font-semibold my-5'>Report Complain</h2>
   <div
  className="relative h-[60vh] w-[60vw] mx-auto hover:shadow hover:scale-105 transition-transform      rounded-2xl my-20 bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(to right,
      #003566,
        rgba(0,0,0,0.2)
      ),
      url(${photo})
    `
  }}
>
    <div className=' flex flex-col gap-5 absolute top-[5%] left-[2%]'>
     
 <fieldset className="fieldset">
      
          <input type="email" className="input" placeholder="Email" />
       <textarea placeholder="Neutral" className="textarea mt-2 textarea-neutral"></textarea>
          <div className='w-[50vw] '>
           <button className=" bg-secondary text-lg rounded text-white font-bold px-6 py-3 mt-2 text-end">Submit</button>
          </div>
         
        </fieldset>  
    </div>
 
</div>   
</div>
        
  

    )
};

export default Report;