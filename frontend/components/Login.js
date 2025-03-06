import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope,faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import { type } from './../node_modules/@fortawesome/fontawesome-svg-core/import.macro.d';
function login() {
  return (
   <div className=' flex justify-center items-center min-h-screen'>
             <div className=' bg-white shadow-md rounded px-8 pt-6 mb-4 w-full max-w-md'>
                 <h2 className=' text-3xl text-center mb-6  font-bold text-white'>
                     <span className=' bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text'>Register</span>
                 </h2>
                 <form className=' mb-6'>
                     <label htmlFor='text' className='  block text-gray-700 text-sm font-bold mb-2'>
                        <FontAwesomeIcon icon={faUser}   className=' mr-2  inline-block w-3.5'/>
                        Username
                     </label>
                     <div>
                         <input id='username' type="text" autoComplete='off' className=' shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight ' placeholder='Enter your username ....'/>
                     </div>
   
   
                      <label htmlFor='email' className='  block text-gray-700 text-sm font-bold mb-2 mt-3'>
                        <FontAwesomeIcon icon={faEnvelope}   className=' mr-2  inline-block w-3.5'/>
                        Email
                     </label>
                     <div >
                         <input id='email' type="email" autoComplete='off' className=' shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight ' placeholder='Enter your email ....'/>
                     </div>
   
                        <label htmlFor='password' className='  block text-gray-700 text-sm font-bold mb-2 mt-3'>
                        <FontAwesomeIcon icon={faLock}   className=' mr-2  inline-block w-3.5'/>
                       Password
                     </label>
                     <div >
                         <input id='password' type="password" autoComplete='off' className=' shadow  appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline leading-tight ' placeholder='Enter your password ....'/>
                     </div>
                     
                 </form>
         </div>
       </div>
  )
}

export default login
