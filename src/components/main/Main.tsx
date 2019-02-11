import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoteListPage from '../noteListPage/NoteListPage';
import EditNotePage from '../editNotePage/EditNotePage';
import ArchivedListPage from '../archivedListPage/ArchivedListPage';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={NoteListPage}/>
        <Route path='/note/:id' component={EditNotePage}/>
        <Route exact path='/archived' component={ArchivedListPage}/>
      </Switch>
    </main>
  );
}