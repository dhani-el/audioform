import { useEffect } from "react"; 
import { useAudioFormData } from "../CustomHooks";
 

export default function TextField({id,required,type,disabled,onChange,sound}){
    const {registerTextField,handleChange} = useAudioFormData()

    function OnChange(stringValue){
        if(onChange){
             onChange(stringValue);
        }else{
            handleChange(id,stringValue)
        }

    }
    function registerSelf(){
        registerTextField(id,required,sound)
    }
    useEffect(function(){
        registerSelf()
    },[])

    return <div id={id} className="z-[1] relative" >
                <input onChange = {(Event)=>{OnChange(Event.target.value)}}
                type={type}
                disabled = {disabled}
                className={`p-1 rounded-sm border-[0.02rem]
                border-solid border-black outline-none `} />
    </div>
}

