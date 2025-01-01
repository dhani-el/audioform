
import { useEffect, useState } from "react"
import { formContext } from "../Context"

export default function Form({children,id,url}){
    const [formData,setFormData] = useState({})
    const [requestState,setRequestState] = useState({loading:false,isError:false,isSuccess:false});
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const audio = new Audio()

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
        console.log("EnsureRequiredStatesAreNotEmpty was clicked");
        for (const textfield in formData) {
                if (formData[textfield]?.value?.trim() === "") {
                    console.log("the curent text field has a value of",formData[textfield]?.value);
                    console.log(`field ${textfield} is not populated`);
                    playAudio(formData[textfield]?.audio)
                    return false
                }
        }
        
        return true
    }

    function playAudio(audiosrc){
        audio.src = audiosrc;
        if (audio.HAVE_FUTURE_DATA) {
            audio.play()
        }
    }

    function SendRequestPayload(){
        return new Promise(function (resolve,reject) {
            setTimeout(() => {
                resolve({name:"daniel", alias:"creator"})
            }, 3000)
        })
    }
    function OnSubmit(event){
        event.preventDefault()
        setLoadingRequestState();
        let filledFields = EnsureRequiredStatesAreNotEmpty();
        if (filledFields) {
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
    }
    function registerTextField(id,isRequired,sound){
        setFormData(init=>({...init,[id]:{value:"",isRequired,audio:sound}}))
    }

    useEffect(function(){
        console.log(formData);
    },[formData])

    return <form>
                <formContext.Provider value={{id,data,error,isLoading:requestState.loading,isSuccess:requestState.isSuccess,isError:requestState.isError,handleChange:OnChange,OnSubmit,registerTextField}}>
                    {children}
                </formContext.Provider>
            </form>
}