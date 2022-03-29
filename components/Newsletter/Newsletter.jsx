import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class Newsletter extends Component {

    render() {
        return (
            <section className="newsletter">
                <div className="container">
                    <div className="section-title text-center"> 
                        <h3 className="fw-600">Subscribe To Our Newsletter</h3>
                        <p className="mt-3">Get more travel inspiration, tips and exclusive offers sent
                            straight to your inbox!</p>
                    </div> 
                    <div className="section-content" > 
                        <form className="newsletter-form">
                            <div className="subscribe-input">
                                <TextField label="Enter your email" variant="outlined" color="primary" fullWidth={true} />
                            </div>
                            <div className="subscribe-btn">
                                <Button variant="contained" color="primary">Subscribe</Button>
                            </div>
                        </form>
                    </div> 
                </div>
              
            </section>
        )
    }
}
