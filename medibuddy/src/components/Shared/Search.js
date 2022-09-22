import React, { useEffect, useState } from "react";
import Select from './Select';

const Search = (props) => {
    const [state, setState] = useState({
        searchText: '',
        searchBy: ''
    });

    useEffect(() => {
        if (props && props.filterTable && state.searchBy.length > 0) {
            props.filterTable(state.searchBy, state.searchText);
        }
    }, [state.searchBy, state.searchText]);

    return (
        <div className="search container flex flex-row" style={{ gap: '20px' }}>
            <div className="flex flex-column">
                <span>Search by</span>
                <Select name={'Column'} onChange={
                    (value) => setState({
                        ...state,
                        searchBy: props.dataSource && props.dataSource.includes(value) ? value : ''
                    })
                } dataSource={props && props.dataSource ? props.dataSource : null} />
            </div>
            {
                state.searchBy.length > 0 &&
                <div className="flex flex-column">
                    <span>Search here</span>
                    <input placeholder="Search" value={state.searchText} onChange={
                        (e) => setState({ ...state, searchText: e.target.value })
                    } />
                </div>
            }
        </div>
    )
}

export default Search;