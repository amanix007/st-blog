import React, {Component} from 'react';

import CardList from '../CaardList/CardList';


class Airlines extends Component{
    constructor(props){
        super(props);
        this.state = {
            column: 4,
            listContent: [
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-1.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-2.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-1.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-3.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-4.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-5.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-6.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-7.svg' },
               { name: 'Thai Lion Air', url: '#', icon: 'assets/images/iconset/icon-8.svg' }
            ]
        }
    }

    render(){
        return(
            <section className="list-section section-padding light-bg">
                <div className="container">
                    <div className="section-title">
                        <h2 className="fw-500">Book Flights from Top Airlines</h2>
                    </div>
                    <div className="section-content mt-32">
                        <div className="row">

                            {this.state.listContent.map((item, index) =>
                                <CardList key={index} item={ item } column={this.state.column} />
                            )}

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Airlines;