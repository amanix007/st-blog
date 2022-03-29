import React, {Component} from 'react';


export default class InfoText extends Component {
    render() {
        return (
            <section className="info-text pt-72 pt-md-50 pt-sm-35 pb-35">
                <div className="container">
                    <div className="container-inner">
                        <h2 className="title fw-500">Welcome to Bangladesh</h2>
                        <p className="subtitle">
                            Bangladesh is south Asia's greenest jewel – a country braided with rivers, with
                            a rich culture waiting to be explored by pioneering travellers
                        </p>
                        <p className="info">
                            Welcome to river country. Bangladesh is braided together by more than 700
                            rivers, producing a deliciously lush landscape with more shades of green than
                            you ever imagined. Travelling by boat is a way of life here, and provides a
                            fabulous opportunity to see the country from a more unusual angle. This is one
                            of the world’s most densely populated countries, but once you’re slowly floating
                            downriver on a small wooden rowboat, it’s easy to imagine you have it all to
                            yourself. Whether you're travelling to hectic Dhaka or to the Sundarbans'
                            mangrove forests, boats large and small will help you explore Bangladesh's
                            riches.
                        </p>
                        <div className="button-group">
                            <a href="/#" className="fw-500 primary-color">READ MORE</a>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}
