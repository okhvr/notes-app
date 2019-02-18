import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArchivedListPage from '../archivedListPage/ArchivedListPage';
import EditNotePage from '../editNotePage/EditNotePage';
import NoteListPage from '../noteListPage/NoteListPage';

export default function Main() {

  return (
    <main>
      <Switch>
        <Route exact={true} path="/" component={NoteListPage}/>
        <Route path="/note/:id" component={EditNotePage}/>
        <Route exact={true} path="/archived" component={ArchivedListPage}/>
      </Switch>
    </main>
  );
}
