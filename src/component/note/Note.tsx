import './Note.css'
import React from "react";
import {NoteDTO} from "../../dto/NoteDTO";


export default function Note({noteDTO, onDelete}: {noteDTO: NoteDTO , onDelete:(note:NoteDTO)=>void}){

    function deleteNote(){
        onDelete(noteDTO);
    }

    return(
        <div className="Note d-flex justify-content-between p-3">
           <h1>{noteDTO.text}</h1>
            <img onClick={deleteNote} src="assets/trash-can.png" alt="" style={{width: '40px'}}/>
        </div>
    );
}

/*Destructuring*/
// let myArray = [10,20,30,40];
// let a,b,c,d;
// [a,b,c,d] = myArray;
// console.log(a, b, c, d);
// let value;
