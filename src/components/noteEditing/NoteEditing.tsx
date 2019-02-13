// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { INote } from '../../interfaces/note';

type MyProps = { editNote: (change: {}) => void, note: INote};

export default class NoteEditing extends Component<MyProps> {
    constructor(props: MyProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
    const { title, description } = this.props.note;
    return (

            <div className="form-group col-11">
                <input
                    onChange={this.handleChange}
                    name="title"
                    value={title}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Note title..."
                />
                <textarea
                    onChange={this.handleChange}
                    name="description"
                    value={description}
                    className="form-control"
                    rows={9}
                    placeholder="Note here..."
                />
            </div>
    );
  }

    private handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const change = {
        [event.target.name]: event.target.value,
        };
        this.props.editNote(change);
    }
}
