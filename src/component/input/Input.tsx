import './Input.css'
import {FormEvent, useRef} from "react";


export default function Input({onAdd}:{onAdd:(text:string)=>void}){

    const refInputContainer = useRef(null);


    function addNote(e:FormEvent){
        e.preventDefault();
        const txtInput = (refInputContainer.current! as HTMLInputElement);
        onAdd(txtInput.value);
        txtInput.value = "";
        txtInput.focus();
    }

    return(
        <form className="Input d-flex flex-row justify-content-center gap-3 p-3" onSubmit={addNote}>
            <input ref={refInputContainer} className="form-control " type="text"/>
            <button className="btn btn-primary" style={{width: '115px'}} >Add Note + </button>
        </form>
    );
}