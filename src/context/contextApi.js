import React,{createContext, useState, useEffect} from "react";
import {fetchDataFromApi} from "../utils/api";



export const Context = createContext();


export const AppContext = (props) =>{
    const [loading,setLoading] = useState(false);
    const [searchResults,setSearchResults] = useState(false);
    const [selectCategories,setSelectCategories] = useState("New");
    const [mobileMenu,setMobileMenu] = useState(false);


    useEffect(() => {
        fetchSelectedCaegoryData(selectCategories)
    }, [selectCategories]);

    //Getting the data from API based on selected categories
    const fetchSelectedCaegoryData = (query) => {
        setLoading(true);
        
        /*Actual api call******/
        fetchDataFromApi(`search/?q=${query}`).then((contents) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        })        
          
    }
    
    return (
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            selectCategories,
            setSelectCategories,
            mobileMenu,
            setMobileMenu,
        }}>
            {props.children}
        </Context.Provider>
    )
}