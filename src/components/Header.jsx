import React,{useContext, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import viewtube_logo from "../images/viewtube_logo.png";
import viewtube_word from "../images/viewtube_word.png";
import microphone from "../images/microphone.png"


import {SlMenu} from "react-icons/sl";
import {IoIosSearch} from "react-icons/io";
import {RiVideoAddLine} from "react-icons/ri";
import {FiBell} from "react-icons/fi";
import {CgClose} from "react-icons/cg";


import {Context} from "../context/contextApi";
import Loader from "../shared/loader";



import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';



const Header = () => {

  const {transcript,finalTranscript,listening,resetTranscript,browserSupport} = useSpeechRecognition();


  
  const [searchQuery,setSearchQuery] = useState("");

  const {loading, mobileMenu, setMobileMenu} = useContext(Context);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0){
        navigate(`/searchResult/${searchQuery}`);
    }

  };

  const searchQueryHandlerBt =  () => {
    if(searchQuery?.length > 0){
      navigate(`/searchResult/${searchQuery}`);
    }
  };

 
  const voiceSearch = () => {
    setSearchQuery('');
    SpeechRecognition.startListening();

    

  };



  useEffect(() => {
    setSearchQuery(transcript);
  }, [transcript]);


  useEffect(() => {

      if(listening == false){
        return;
      }

      if( currentUrl.includes("searchResult") && finalTranscript === ''){
        return;
      }
      else if(currentUrl.includes("video") && finalTranscript === ''){
        return;
      }
      else{
        navigate(`/searchResult/${finalTranscript}`);
      }
      
      

  }, [finalTranscript]);

  
  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const currentUrl = window.location.href;

  const pathName = window.location.href;
  const pathArr = pathName.split("/");
  const pageName = pathArr[3];

  
  return (
    
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black dark:bg-black">
      {loading && <Loader/> }

      <div className="flex h-5 items-center">
      {pageName !== "video" && (
        
          <div className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"  onClick={mobileMenuToggle}>
            {mobileMenu ? (
                <CgClose className='text-white text-xl'/>
              ) : (
                <SlMenu className='text-white text-xl'/>
            )}
            
          </div>
        )}

        <Link to="/" className="flex h-5 items-center">
          <img className="h-full hidden md:block " src={viewtube_word} alt="ViewTube" style={{ height: '200%' }}/>
          <img className="h-full md:hidden" src={viewtube_logo} alt="ViewTube" style={{ height: '200%' }}/>
        </Link>
      </div>
      <div className="group flex items-center">
              <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                  <div className="w-10 items-center justify-center hidden group-focus-within:md:flex" >
                      {/*<IoIosSearch className="text-white text-xl"/>*/}
                  </div>
                  <input id='SQ'
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                    value={searchQuery}
                  />  
              </div>
              <button className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]">
                <IoIosSearch className="text-white text-xl" onClick={searchQueryHandlerBt}/>
              </button>
              <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                  <img className="text-white text-xl cursor-pointer" src={microphone} onClick={voiceSearch}/>
              </div>

          </div>
          <div className="flex items-center">
          </div>
    </div>

            
  )


            
};

export default Header;




