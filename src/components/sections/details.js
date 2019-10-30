import React from 'react';

class Details extends React.Component {
    render() {
        const { onPrevClick, onNextClick, selectedOrders, addOption } = this.props;
        return (
            <div className="details">
                <div className="container">
                    <div className="controls">
                        <button onClick={onPrevClick}>Previous</button>
                        <button onClick={onNextClick}>Next</button>
                    </div>
                    <div className="options">
                        <h3>Select options for the orders:</h3>
                        {selectedOrders.map((order) =>
                            <div key={order.id}>
                                <h4>Options for order {order.id}</h4>
                                <label htmlFor="option1">Option 1</label>
                                <input onChange={() => addOption(order.id, 'option1')} type="checkbox" id="option1" name="option1"/>
                                <label htmlFor="option2">Option 2</label>
                                <input onChange={() => addOption(order.id, 'option2')} type="checkbox" id="option2" name="option1"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;
