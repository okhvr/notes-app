import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { httpMethod, httpRequest } from '../../helpers/httpRequest';
import { INote } from '../../interfaces/note';
import Note from '../note/Note';
import NoteCreation from '../noteCreation/NoteCreation';
import Search from '../search/Search';

type MyProps = {};
type MyState = { notes: INote[] };

export default class NoteListPage extends Component<MyProps, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {notes: []};
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  componentDidMount() {
    this.loadNotes();
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">My Notes 📝</span>
        <Link to={'/archived'}>
            <button className="btn btn-light">archived notes</button>
        </Link>
        <Search handleSearch={this.handleSearch}/>
      </nav>
      <div className="container">
        <NoteCreation addNote={this.addNote}/>
        {this.state.notes.length === 0 ?
        <div>There is no notes</div> :
        this.state.notes.map((note) =>
        <Note
          note={note}
          key={note.id}
          deleteNote={this.deleteNote}
          handleMarkAsDone={this.handleMarkAsDone}
          handleArchive={this.handleArchive}
        />)}
      </div>
    </div>
    );
  }

  private addNote(note: INote) {
    httpRequest(httpMethod.post, 'notes', note)
    .then((res) => res.json())
    .then((n) => this.setState({notes: [...this.state.notes, n]}))
    .catch((er: Error) => console.error('Er', er));
  }

  private deleteNote(note: INote) {
    httpRequest(httpMethod.delete, `notes/${note.id}`)
    .then(() => this.setState({notes: this.state.notes.filter((n) => n.id !== note.id)}))
    .catch((er: Error) => console.error('Er', er));
  }

  private handleMarkAsDone(note: INote) {
    httpRequest(httpMethod.patch, `notes/${note.id}`, {isDone: !note.isDone})
    .then(() => {
      const marked = this.state.notes.find((n) => n.id === note.id);
      if (!marked) {
        return;
      }
      const updatedNotes = this.state.notes.map((n) => n === marked ? {...marked, isDone: !marked.isDone} : n);
      this.setState({notes: updatedNotes});
    })
    .catch((er: Error) => console.error('Er', er));
  }

  private handleSearch(searchValue: string) {
    if (searchValue.length === 0) {
      this.loadNotes();
    }
    httpRequest(httpMethod.get, `notes?isArchived=false&q=${searchValue}`)
    .then((res) => res.json())
    .then((notes) => this.setState({notes}))
    .catch((er: Error) => console.error('Er', er));
  }

  private handleArchive(note: INote) {
    httpRequest(httpMethod.patch, `notes/${note.id}`, {isArchived: true})
    .then(() => {
      const archived = this.state.notes.find((n) => n.id === note.id);
      if (!archived) {
        return;
      }
      const updatedNotes = this.state.notes.filter((n) => n !== archived);
      this.setState({notes: updatedNotes});
    })
    .catch((er: Error) => console.error('Er', er));
  }

  private loadNotes() {
    httpRequest(httpMethod.get, 'notes?isArchived=false')
    .then((res) => res.json())
    .then((notes) => this.setState({notes}))
    .catch((er: Error) => alert(`Er ${er}`));
  }
}
