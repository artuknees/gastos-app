import React from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";


const Profile = () => {
    initFirebase();
    const auth = getAuth();
    const logOut = () => {
        console.log('out');
        auth.signOut();
        localStorage.setItem('logged', 'false');
        console.log('signed out')
    };


    return (
        <button className='mt-10 h-[45px] w-full bg-red-main rounded-full text-gray-main shadow-lg' onClick={()=> logOut()}>Log out</button>
    )
};

export default Profile;