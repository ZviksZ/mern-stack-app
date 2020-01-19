import React, {useCallback, useContext, useEffect, useState} from 'react'
import {LinksList}                                           from "../components/LinksList.jsx";
import {Loader}                                              from "../components/Loader.jsx";
import {AuthContext}                                         from "../context/AuthContext.js";
import {useHttp}                                             from "../hooks/http.hook.js";

export const LinksPage = () => {
   const [links, setLinks] = useState([])
   const {loading, request} = useHttp()
   const {token} = useContext(AuthContext)
   
   const fetchLinks = useCallback(async () => {
      try {
         const fetched = await request('/api/link', 'GET', null, {
            Authorization: `Bearer ${token}`
         })
         setLinks(fetched)
      } catch (e) {}
   }, [token, request])
   
   useEffect(() => {
      fetchLinks()
   }, [fetchLinks])

   if (loading) {
      return <Loader/>
   }
   
   return (
      <>
         {!loading && <LinksList links={links}/>} 
      </>
   )
}