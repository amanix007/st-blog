import React, {Component} from 'react';


class CardList extends Component{

    state = {
        column: this.props.column,
        name: this.props.item.name,
        cost: this.props.item.cost,
        url: this.props.item.url,
        unit: this.props.item.unit,
        icon: this.props.item.icon
    };

    render(){
        
        let CostText = null;
        let UnitText = null;

        if(this.state.cost){
            CostText = <span>from <strong>BDT { this.state.cost }</strong></span>
        }
        if(this.state.unit){
            UnitText = <small>/{ this.state.unit }</small>
        }

        return(
            <div className={"col-xl-"+ this.state.column +" col-lg-4 col-md-4 col-sm-6 col-xs-12"}>
                <a href={ this.state.url } className="list">
                    <span className="icon"><img src={ this.state.icon } alt="" /></span> 
                    <h5 className="fw-500">{ this.state.name }</h5>
                    <div className="cost fz12 mt-1">
                        { CostText }
                        { UnitText }
                    </div>
                </a>
            </div>
        )
    }
}
export default CardList;