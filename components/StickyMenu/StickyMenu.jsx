import React, {Component} from 'react';

import Link from 'next/link';

export default class StickyMenu extends Component {
    render() {
        const {children, modifiers} = this.props;

        return (
            <div className={"sticky-menu " + modifiers }>
                <ul>
                    <li className="active">
                        <Link passHref href="/#"><a>About</a></Link>
                    </li>
                    <li>
                        <Link passHref href="/#"><a>Cities</a></Link>
                    </li>
                    <li>
                        <Link passHref href="/#"><a>Attractions</a></Link>
                    </li>
                    <li>
                        <Link passHref href="/#"><a>Deals</a></Link>
                    </li>
                    <li>
                        <Link passHref href="/#"><a>Articles</a></Link>
                    </li>
                </ul>

            </div>
        )
    }
}
