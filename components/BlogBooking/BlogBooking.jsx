import React, { Component } from 'react'
import { Button } from '@material-ui/core'


export default class BlogBooking extends Component {
    render() {
        let { bookings } = this.props.blogBooking;
        return (
            <section className="blog-booking">
                <h2 className="fw-500 mb-4">Booking</h2>
                <div className="row">
                    {bookings.map((b, i) => <div key={i} className="col-md-6" >
                        <div className="item">
                            <div className="image flex-img">
                                <img src={b.img_src} alt={b.title} />
                            </div>
                            <h4 className="fw-500 mt-4">{b.title}</h4>
                            <p className="mt-1">{b.title}</p>
                            <Button variant="contained" href={b.link} color="primary"> {b.button_text}</Button>
                        </div>
                    </div>)}


                </div>
            </section>
        )
    }
}




