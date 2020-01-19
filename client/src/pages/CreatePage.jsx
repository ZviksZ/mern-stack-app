import React, {useContext, useEffect, useState} from 'react'
import {useHistory}                             from "react-router-dom";
import {AuthContext}                            from "../context/AuthContext.js";
import {useHttp}                                from "../hooks/http.hook.js";

export const CreatePage = () => {
   const history = useHistory()
   const auth = useContext(AuthContext)
   const {request} = useHttp()
   const [link, setLink] = useState('')
   
   useEffect(() => {
      window.M.updateTextFields()
   }, [])
   
   const pressHandler = async e => {
      if (e.key === 'Enter') {
         try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
               Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
         } catch (e) {
            
         }
      } 
   }
   
   return (
      <div className="row">
         <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
               <input
                  placeholder="Вставьте ссылку"
                  onChange={e => setLink(e.target.value)}
                  id="link"
                  type="text"
                  name="email"
                  value={link}
                  onKeyPress={pressHandler}
               />
               <label htmlFor="link">Введите ссылку</label>
            </div>
         </div>
      </div>  
   )
}