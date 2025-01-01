import TextField from "./TextField";
import Form from "./Form";
import Button from "./Button/components";
import entername from "./assets/sounds/name.mp3"
import password from "./assets/sounds/password.mp3"
export default function StoryBoard(){
    return <div className="w-screen min-h-screen bg-lime-300">
                <div>
                    <p>This is a basic textfield</p>
                    <Form id={765} >
                        <TextField sound={entername} id={32} required={true} type={"text"}/>
                        <TextField sound={password} id={33} required={false} type={"phone"}/>
                        <TextField sound={entername} id={324} required={true} type={"tel"}/>
                        <TextField sound={password} id={335} required={false} type={"text"}/>
                        <TextField sound={entername} id={346} required={false} type={"text"}/>
                        <Button/>
                    </Form>
                </div>
    </div>
}