import React from 'react';

export const SearchBar = ({ onChange }) => {
    return (
        <div className="input-field">
            <label htmlFor="title">Search</label>
            <input type="text" id="title" onChange={e => onChange(e.target.value)} />
        </div>
    )
}