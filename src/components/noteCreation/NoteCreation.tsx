import React, { Component, FormEvent, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { INote } from '../../interfaces/note';

type MyProps = { addNote: (note: INote) => void};
type MyState = { title: string, description: string };

export default class Note extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }
    
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
          title: event.target.value
        });
    }

    handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            description: event.target.value
          });
    }

    handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const note: INote = {
            title: this.state.title,
            description: this.state.description,
            created: new Date(),
            isDone: false,
            isArchived: false
        }
        this.props.addNote(note);
        this.setState({
            "title": "",
            "description": ""
        });
    }
    
    render() {
        return (
            <form 
                onSubmit={this.handleSubmitForm}>
                <div className="form-group">
                    <input 
                        onChange={this.handleTitleChange}
                        name="title"
                        value={this.state.title}
                        className="form-control form-control-lg" type="text" placeholder="Note title..."></input>
                    <textarea 
                        onChange={this.handleDescriptionChange}
                        name="description"
                        value={this.state.description}
                        className="form-control" rows={3} placeholder="Note here..."></textarea>
                <button type="submit" className="btn btn-info btn-block">Add new note</button>
                </div>
            </form>
        );
    }
}