// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

type MyProps = { handleSearch: (searchValue: string) => void };
type MyState = { searchValue: string };

export default class Note extends Component<MyProps, MyState> {

    state = {
        searchValue: '',
    };

    render() {

    return (
            <div className="form-group">
                <input
                    onChange={this.handleSearchChange}
                    name="search"
                    value={this.state.searchValue}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Search"
                />
            </div>
    );
  }

    private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchValue: event.currentTarget.value,
        }, () => {
            this.props.handleSearch(this.state.searchValue);
        });
    }
}
