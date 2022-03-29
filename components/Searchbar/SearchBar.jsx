import React, { useState } from 'react';


export default function SearchBar() {
    const [param, setParam] = useState("");
    const search = (e) => {
        e.preventDefault();
        window.location = `/blog-search?s=${param}`
    }
    return (
        <form action="#" onSubmit={search} className="search-from">
            <input type="text"
                onChange={e => setParam(e.target.value)}
                value={param}
                placeholder="Find your Next Adventure" />
            <button type="submit">
                <i className="mdi mdi-magnify fz18"></i>
            </button>

        </form>
    )
}
