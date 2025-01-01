
import { useAudioFormData } from "../CustomHooks"

export default function Button({value="Submit"}){
    let {loading,isError,isSuccess,OnSubmit} = useAudioFormData();

    return <button disabled = {loading} onClick={(Event)=>{OnSubmit(Event)}}>
                {value}
    </button>
}