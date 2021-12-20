import React from 'react';

export class DocumentUnique extends React.Component {
    state = {
        numChildren: 0
    }

    render() {
        const children = [];

        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<ChildComponent key={i} number={i}/>);
        }
        ;

        return (
            <div className="border">
                <ParentComponent addChild={this.onAddChild}>
                    {children}
                </ParentComponent>
                <ChildComponent>
                    {children}
                </ChildComponent>
                <Component addChild={this.onAddChild}>
                    {children}
                </Component>
            </div>
        );
    }

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }

}

const ParentComponent = props => (
        <div className="document__unique">
            <p className="document__unique-item">

            </p>
            <p className="document__unique-item">
                Start date
            </p>
            <p className="document__unique-item">
                End Date
            </p>
            <p className="document__unique-item">
                Original Currency
            </p>
            <p className="document__unique-item">
                Accomodation Fee
            </p>
            <p className="document__unique-item">
                Other Fee
            </p>
            <p className="document__unique-item">
                Subtotal of the original currency
            </p>
            <p className="document__unique-item">
                Exchange Rate
            </p>
            <p className="document__unique-item">
                Amount (USD)
            </p>
            <p className="document__unique-item">
                Travel Days
            </p>
            <p className="document__unique-item">
                Region
            </p>
            <p className="document__unique-item">
                Allowance
            </p>
            <p className="document__unique-item">
            </p>
        </div>

);
const Component = props => <div className="document__unique-more">
    <input type="checkbox" id="radio"/>
    <label htmlFor="radio" className="document__unique-label"> select all</label>
    <i className="far fa-trash-alt document__unique-svg"> </i>
    <button className="document__unique-btn document__unique-button-1">
        <i className="fas fa-arrow-up"> </i>
    </button>
    <button className="document__unique-btn document__unique-button-2" onClick={props.addChild}>
        <i className="fas fa-plus"> </i>
    </button>
    <button className="document__unique-btn document__unique-button-3">
        <i className="fas fa-arrow-down"> </i>
    </button>
    <div className="document__rows">
        {props.children}
    </div>
</div>


const ChildComponent = props => <div className="document__unique-fill">
    <p className="document__unique-fill-item document__unique-filled-1  ">
        <input type="checkbox" id="radio"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-2 ">
        <input type="date"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-3">
        <input type="date"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-4">
        <select id="cars" className="document__select">
            <option label="==Select==">==Select==</option>
            <option label="Department afford/ Team afford">Department afford/ Team
                afford
            </option>
            <option label="Project afford/ Project">Project afford/ Project</option>
        </select>
    </p>
    <p className="document__unique-fill-item document__unique-filled-5">
        <input type="text"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-6">
        <input type="text"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-7">
        <input type="text" placeholder="0"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-8">
        <input type="text"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-9">
        <input type="text" placeholder="0"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-10">
        <input type="text"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-11">
        <select id="cars" className="document__select">
            <option label="==Select==">==Select==</option>
            <option label="Department afford/ Team afford">Department afford/ Team
                afford
            </option>
            <option label="Project afford/ Project">Project afford/ Project</option>
        </select>
    </p>
    <p className="document__unique-fill-item document__unique-filled-12">
        <input type="text" placeholder="0.00"/>
    </p>
    <p className="document__unique-fill-item document__unique-filled-13">

    </p>
</div>
