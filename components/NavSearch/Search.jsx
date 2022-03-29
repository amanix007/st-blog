import React, {useState} from 'react';

import { IconButton } from '@material-ui/core';
import SearchBar from '../Searchbar/SearchBar';

export default function Search() {
    const [show, toggleAction] = useState(false);

    const toggle = () => {
        toggleAction(!show);
    }

    let toggleClass = '';
    if(show){
        toggleClass = 'show';
    }

    return (
        <div className="nav-search">
            <div className="search-toggle">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={toggle}>
                    <i className="mdi mdi-magnify fz18"></i>
                </IconButton>
            </div>

            <div className={"search-panel d-flex align-items-center " + toggleClass}>
                <SearchBar />
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={toggle}>
                    <i className="mdi mdi-close fz18"></i>
                </IconButton>
            </div>
        </div>
    )
}
