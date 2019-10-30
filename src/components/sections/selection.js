import React from 'react';

class Selection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: props.items };
        this.filterItems = this.filterItems.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }
    filterItems(event) {
        const { items } = this.props;
        const filteredItems = items.filter(item => {
            return 0 === item.name.indexOf(event.target.value);
        });

        this.setState({ items: filteredItems });
    };

    isSelected(item) {
        return this.props.selectedOrders.findIndex(order => order.id === item.id) !== -1;
    }

    render() {
        const { onNextClick, updateSelection } = this.props;
        const { items } = this.state;
        return (
            <div className="selection">
                <div className="container">
                    <div className="controls">
                        <button onClick={onNextClick}>Next</button>
                    </div>
                    <h3>Select the orders for import!</h3>
                    <div className="filter">
                        <input placeholder="Search by name" type="text" onChange={this.filterItems}/>
                    </div>
                    <br/>
                    <div className="list">
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Id</td>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>Color</td>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map(item =>
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => updateSelection(item)}
                                            value={this.isSelected(item)}
                                            checked={this.isSelected(item)}
                                        />
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.color}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Selection;
