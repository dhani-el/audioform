

import { formContext } from "../Context";
import { useContext } from "react";

export function useAudioFormData(){
    return useContext(formContext);
}