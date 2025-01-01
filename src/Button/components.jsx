
import { useAudioFormData } from "../CustomHooks"

export default function Button({value="Submit"}){
    let {loading,isError,isSuccess,OnSubmit} = useAudioFormData();

    return <button className="z-[1] bg-red-400 relative" disabled = {loading} onClick={(Event)=>{OnSubmit(Event)}}>
                {value}
    </button>
}