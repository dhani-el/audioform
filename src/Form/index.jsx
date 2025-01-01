
import { useState } from "react"
import { formContext } from "../Context"

export default function Form({children,id,url}){
    const [formData,setFormData] = useState({})
    const [requestState,setRequestState] = useState({loading:false,isError:false,isSuccess:false});
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);

    function OnChange(inputId,inputValue){
        setFormData(()=>{
            return {...formData,[inputId]:{...formData[inputId],value:inputValue}}
        })
    }
    function setErrorRequestState(){
        setRequestState(()=>{
            return {loading:false,isError:true,isSuccess:false}
        })
    }
    function setLoadingRequestState(){
        setRequestState(()=>{
            return {loading:true,isError:false,isSuccess:false}
        })
    }
    function setSuccessRequestState(){
        setRequestState(()=>{
            return {loading:false,isError:false,isSuccess:true}
        })
    }
    function setErrorDetails(errorObj){
        setError(()=>errorObj)
    }
    function setDataDetails(dataObj){
        setData(()=>dataObj)
    }
    function EnsureRequiredStatesAreNotEmpty(){

    }
    function SendRequestPayload(){

    }
    function OnSubmit(){
        setLoadingRequestState();
        EnsureRequiredStatesAreNotEmpty();
        SendRequestPayload()
        .then(response=>{
                setSuccessRequestState(response);
                setDataDetails(response);
                return response;
        }).catch(error=>{
                setErrorRequestState(error);
                setErrorDetails(error)
                console.log(error);
                return error
        })

    }
    function registerTextField(id,isRequired){
        setFormData(init=>({...init,[id]:{value:"",isRequired}}))
    }

    return <form>
                <formContext.Provider value={[id,data,error,requestState.loading,requestState.isSuccess,requestState.isError,OnChange,OnSubmit,registerTextField]}>
                    {children}
                </formContext.Provider>
            </form>
}