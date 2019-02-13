// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { INote } from '../../interfaces/note';

type MyProps = {
  note: INote,
  deleteNote?: (note: INote) => void,
  handleMarkAsDone?: (note: INote) => void,
  handleArchive: (note: INote) => void,
};

export default class Note extends Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  render() {
    return (
      <article className='card border-light mb-3'>
            <header className='card-header'>
              <h4 className='card-title'>{this.props.note.title}</h4>
            </header>
            <div className='card-body'>
              <div className='btn-group'>
              {this.props.note.isDone ?
                <button
                  onClick={this.handleMarkAsDone}
                  className='btn btn-success btn-sm'
                  disabled={this.props.note.isArchived}
                >✔️
                </button> :
                <button
                  onClick={this.handleMarkAsDone}
                  className='btn btn-success btn-sm'
                  disabled={this.props.note.isArchived}
                >⚫
                </button>}
                <Link to={`/note/${this.props.note.id}`}>
                  <button
                    className='btn btn-info btn-sm'
                    disabled={this.props.note.isArchived}
                  >🖌
                  </button>
                </Link>

                <button
                  onClick={this.handleDelete}
                  className='btn btn-danger btn-sm'
                  disabled={this.props.note.isArchived}
                >🗑️
                </button>
                {this.props.note.isArchived ?
                <button
                  onClick={this.handleArchive}
                  className='btn btn-success btn-sm'
                >📩 unarchive
                </button> :
                <button
                  onClick={this.handleArchive}
                  className='btn btn-secondary btn-sm'
                >📩 archive
                </button>}
              </div>
              <p className='card-text'>{this.props.note.description}</p>
            </div>
            <footer>
              <small>Created: {this.props.note.created}</small>
            </footer>
      </article>
    );
  }

  private handleDelete() {
    if (this.props.deleteNote) {
      this.props.deleteNote(this.props.note);
    }
  }

  private handleMarkAsDone() {
    if (this.props.handleMarkAsDone) {
      this.props.handleMarkAsDone(this.props.note);
    }
  }

  private handleArchive() {
    this.props.handleArchive(this.props.note);
  }
}
