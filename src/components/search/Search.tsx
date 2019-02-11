import React, { Component, FormEvent, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as CSS from 'csstype';
import { INote } from '../../interfaces/note';

type MyProps = { handleSearch: (searchValue: string) => void };
type MyState = { searchValue: string };

export default class Note extends Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            searchValue: '',
        };
    
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
          searchValue: event.target.value
        });
        this.props.handleSearch(this.state.searchValue);
    }

  render() {
    return (
            <div className="form-group">
                <input 
                    onChange={this.handleSearchChange}
                    name="search"
                    value={this.state.searchValue}
                    className="form-control form-control-lg" type="text" placeholder="Search"></input>
                    {/* <button className="btn btn-info btn-sm">🔍</button> */}
            </div>
    );
  }
}