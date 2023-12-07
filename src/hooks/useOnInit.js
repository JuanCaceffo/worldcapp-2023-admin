import { useEffect } from "react"

//CustomHook acciones iniciales
//Modo de uso: useOnInit(()=> buscarMails(textoBusqueda) )
export const useOnInit = (initialCallBack)=>{
  useEffect(() => {
    initialCallBack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])}