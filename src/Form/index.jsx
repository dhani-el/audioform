
import {useState } from "react"
import { formContext } from "../Context"

export default function Form({children,id,url}){
    const [formData,setFormData] = useState({})
    const [requestState,setRequestState] = useState({loading:false,isError:false,isSuccess:false});
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const audio = new Audio();

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
                    visuallyIsolateEmptyInput(textfield)
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
    function visuallyIsolateEmptyInput(inputId){
        const formBlur = document.getElementById(`blur${id}`);
        const  emptyInput = document.getElementById(`${inputId}`);
        formBlur.style.display = "block"
        formBlur.style.zIndex = 2;
        emptyInput.style.zIndex = 3;
        setTimeout(() => {
            removeVisualIsolation(inputId)
        }, 2000);
    }
    function removeVisualIsolation(inputId){
        const formBlur = document.getElementById(`blur${id}`);
        const  emptyInput = document.getElementById(`${inputId}`);
        formBlur.style.display = "none"
        formBlur.style.zIndex = 0;
        emptyInput.style.zIndex = 1;
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

    return <form className="relative">
                <div id={`blur${id}`} className="w-full h-full absolute top-0 left-0 bg-slate-700 opacity-50 z-0 hidden">

                </div>
                <formContext.Provider value={{id,data,error,isLoading:requestState.loading,isSuccess:requestState.isSuccess,isError:requestState.isError,handleChange:OnChange,OnSubmit,registerTextField}}>
                    {children}
                </formContext.Provider>
            </form>
}