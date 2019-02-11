import React, { Component, Props } from 'react';
import { httpRequest, httpMethod } from '../../helpers/httpRequest';
import { RouteComponentProps } from 'react-router';
import { INote } from '../../interfaces/note';
import { Link } from 'react-router-dom';
import NoteEditing from '../noteEditing/NoteEditing';
import { debounce } from '../../helpers/debounce';

type EditNoteProps = Props<{}> & RouteComponentProps<{id:string}>;
type State = {note: INote};

export default class EditNotePage extends Component<EditNoteProps, State> {

  constructor(props: EditNoteProps) {
    super(props);
    this.state = {note: {description:'', title:'', created:new Date, isDone: false, isArchived: false}}
    this.handleEditNote = this.handleEditNote.bind(this);
  }

  componentDidMount() {
    this.loadNote(this.props.match.params.id);
  }

  debounceEditNote = debounce(200, this.editNote);

  loadNote(id: string) {
    httpRequest(httpMethod.get, "notes/" + id)
    .then(res => res.json())
    .then(note => this.setState({note}))
    .catch((er: Error) => alert(`Er ${er}`))
  }

  handleEditNote(change: {title?: string, description?: string}) {
    this.setState({note: {...this.state.note, ...change}});
    this.debounceEditNote(this.state.note.id, change);
  }

  private editNote(id: number, change: {}) {
    httpRequest(httpMethod.patch, `notes/${id}`, change)
    .catch((er: Error) => console.log('Er', er))
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Here you can edit your note 📝</span>
          <Link to={'/'}>
                  <button className="btn btn-light btn-sm">⬅️ Back to the notes list
                  </button>
          </Link>
        </nav>
        <div className="container">
          <div className="row justify-content-md-center">
            <NoteEditing
              editNote={this.handleEditNote}
              note={this.state.note}>
            </NoteEditing>
          </div>
        </div>
      </div>
    );
  }
}
