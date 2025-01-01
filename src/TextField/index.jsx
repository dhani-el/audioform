import { useContext } from "react"; 
import { formContext } from "../Context";
 

export default function TextField({id,required,type,disabled,onChange}){
    const [formid,ONChange,registerTextField] = useContext(formContext);

    function OnChange(stringValue){
        if(onChange){
             onChange(stringValue);
        }else{
            ONChange(stringValue)
        }

    }
    function registerSelf(){
        registerTextField(id,required)
    }

    useEffect(function(){
        registerSelf()
    },[])

    return <div>
                <input onChange = {(Event)=>{OnChange(Event.target.value)}}
                type={type}
                disabled = {disabled}
                className={`p-1 rounded-sm border-[0.02rem]
                border-solid border-black outline-none`} />
    </div>
}

// 356:{
// formOne{
// value:""
// isRequired:true
// }
// 
// }
// 
