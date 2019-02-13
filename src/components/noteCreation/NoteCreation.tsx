// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ChangeEvent, Component, FormEvent } from 'react';
import { INote } from '../../interfaces/note';

type MyProps = { addNote: (note: INote) => void};
type MyState = { title: string, description: string };

export default class Note extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            description: '',
            title: '',
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitForm}>
                <div className="form-group">
                    <input
                        onChange={this.handleTitleChange}
                        name="title"
                        value={this.state.title}
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Note title..."
                    />
                    <textarea
                        onChange={this.handleDescriptionChange}
                        name="description"
                        value={this.state.description}
                        className="form-control"
                        rows={3}
                        placeholder="Note here..."
                    />
                <button type="submit" className="btn btn-info btn-block">Add new note</button>
                </div>
            </form>
        );
    }

    private handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
          title: event.target.value,
        });
    }

    private handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            description: event.target.value,
          });
    }

    private handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const note: INote = {
            created: new Date(),
            description: this.state.description,
            isArchived: false,
            isDone: false,
            title: this.state.title,
        };
        this.props.addNote(note);
        this.setState({
            description: '',
            title: '',
        });
    }
}
