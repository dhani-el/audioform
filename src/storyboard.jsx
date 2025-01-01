import TextField from "./TextField";
import Form from "./Form";
import Button from "./Button/components";
export default function StoryBoard(){
    return <div className="w-screen min-h-screen bg-lime-300">
                <div>
                    <p>This is a basic textfield</p>
                    <Form id={765} >
                        <TextField id={32} required={true} type={"text"}/>
                        <TextField id={33} required={false} type={"phone"}/>
                        <TextField id={324} required={true} type={"tel"}/>
                        <TextField id={335} required={false} type={"text"}/>
                        <TextField id={346} required={false} type={"text"}/>
                        <Button/>
                    </Form>
                </div>
    </div>
}