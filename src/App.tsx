import React from 'react';
import './App.css';
import Input from "./component/input/Input";
import Note from "./component/note/Note";
import {NoteDTO} from "./dto/NoteDTO";


export const USER_ID = "7bc90fbf-f40b-48f3-aed0-a06d9a9c50c6";

export default class App extends React.Component<any, {notes:Array<NoteDTO>}>{


    constructor(props: any) {
        super(props);
        this.state  = {notes:[]};
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    componentDidMount() {
        this.loadAllNotes();
    }

    /*send request to the user*/
    async loadAllNotes(){
        const response =await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`);
        this.setState({
            notes: await response.json()
        })
    }

    async addNote(text:string){

        const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new NoteDTO(null, text, USER_ID))
        });

        if(response.status === 201){
            this.setState({
                notes: [await response.json(),...this.state.notes]
            });
        }
    }

    async deleteNote(noteDTO: NoteDTO){
       const response = await fetch(`http://localhost:8080/notes/api/v1/users/${USER_ID}/notes/${noteDTO.id}`,
           {method: 'DELETE'});

       if(response.status === 204){
           // const elementToBeRemove = this.state.notes.indexOf(noteDTO);
           // this.state.notes.splice(elementToBeRemove, 1);
           const newArray = this.state.notes.filter(n=>n !== noteDTO);
           this.setState({
               notes: newArray
           });
       }
    }

  render() {
    return (
        <React.Fragment>
          <header>
            <h1 className="text-center mt-3">Simple Note Taking React App</h1>
          </header>
            <Input onAdd={this.addNote} />
            {this.state.notes.map(note=><Note key={note.id} noteDTO={note} onDelete={this.deleteNote}/> )}

        </React.Fragment>
    );
  }
}
