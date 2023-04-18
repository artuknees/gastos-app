import React , {useState} from 'react';
import Image from 'next/image';

const NavBar = ({modes , mode , setMode}) => {
  return (
    <div className="h-[80px] border-t border-t-black-main flex flex-row items-center justify-between cursor-pointer">
        {modes.map(item => {return (
            <div 
            key={item} 
            className={`w-1/4 h-full rounded rounded-2xl flex flex-col items-center justify-center first:rounded-l-none last:rounded-r-none transition ${mode===item && 'bg-yellow-main'}`} 
            onClick={() => setMode(item)}>
                <div className=" mb-1">
                    <Image 
                    src={`/${item}.svg`} 
                    width={24} 
                    height={24} 
                    style={{ width: 'auto', height: '100%' }}
                    alt='icon'/>
                </div>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </div>
        )})}
    </div>
  );
}

export default NavBar;