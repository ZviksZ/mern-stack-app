import {useCallback} from 'react'

export const useMessage = () => {
   return useCallback(text => {
      if (window.matchMedia && text) {
         window.M.toast({html: text})
      } 
   }, [])
}