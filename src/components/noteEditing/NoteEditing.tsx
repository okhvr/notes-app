import React, { Component, FormEvent, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { INote } from '../../interfaces/note';

type MyProps = { editNote: (change: {}) => void, note: INote};
// type MyState = { title: string, description: string, [key: string]: string };

export default class NoteEditing extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const change = {
            [event.target.name]: event.target.value
          }
        this.props.editNote(change);
    }

  render() {
    const {title, description} = this.props.note;
    return (
        
            <div className="form-group col-11">
                <input 
                    onChange={this.handleChange}
                    name="title"
                    value={title}
                    className="form-control form-control-lg" type="text" placeholder="Note title..."></input>
                <textarea 
                    onChange={this.handleChange}
                    name="description"
                    value={description}
                    className="form-control" rows={9} placeholder="Note here..."></textarea>
            </div>
    );
  }
}