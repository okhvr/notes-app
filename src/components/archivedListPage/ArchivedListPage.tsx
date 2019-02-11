import React, { Component } from 'react';
import { INote } from '../../interfaces/note';
import { httpRequest, httpMethod } from '../../helpers/httpRequest';
import Note from '../note/Note';
import { Link } from 'react-router-dom';


type MyProps = {};
type MyState = { notes: INote[] };

export default class ArchivedListPage extends Component<MyProps, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {notes: []};
    this.handleUnArchive = this.handleUnArchive.bind(this);
  }

  componentDidMount() {
    this.loadNotes();
  }

  handleUnArchive(note:INote) {
    httpRequest(httpMethod.patch, `notes/${note.id}`, {isArchived: false})
    .then(() => {
      const unArchived = this.state.notes.find(n => n.id === note.id);
      if (!unArchived) {
        return;
      }
      const updatedNotes = this.state.notes.filter(n => n !== unArchived);
      this.setState({notes: updatedNotes});
    })
    .catch((er: Error) => console.log('Er', er))
  }

  loadNotes() {
    httpRequest(httpMethod.get, "notes?isArchived=true")
    .then(res => res.json())
    .then(notes => this.setState({notes}))
    .catch((er: Error) => alert(`Er ${er}`))
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-light bg-light">
        <Link to={'/'}>
            <button className="btn btn-light">
            <span className="navbar-brand mb-0 h1">My Notes 📝</span>
            </button>
        </Link>
      </nav>
      <div className="container">
        {this.state.notes.length === 0 ?
        <div>There is no archived notes</div>:
        this.state.notes.map((note) => 
        <Note
          note={note}
          key={note.id}
          handleArchive={this.handleUnArchive}
        ></Note>)}
      </div>
    </div>
    );
  }
}
