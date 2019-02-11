// tslint:disable-next-line:no-submodule-imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ChangeEvent, Component, FormEvent } from 'react';
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

    public handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
          searchValue: event.target.value,
        });
        this.props.handleSearch(this.state.searchValue);
    }

    public render() {
    return (
            <div className='form-group'>
                <input
                    onChange={this.handleSearchChange}
                    name='search'
                    value={this.state.searchValue}
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Search'
                />
            </div>
    );
  }
}
