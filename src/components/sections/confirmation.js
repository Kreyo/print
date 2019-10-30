import React from 'react';

class Details extends React.Component {
    render() {
        const { onPrevClick, selectedOrders, confirmSelection } = this.props;
        return (
            <div className="details">
                <div className="container">
                    <div className="controls">
                        <button onClick={onPrevClick}>Previous</button>
                    </div>
                    <h3>Selected orders confirmation:</h3>
                    <ul>
                        {selectedOrders.map(order =>
                            <ul key={order.id}>
                                <li>Id: {order.id}</li>
                                <li>Name: {order.name}</li>
                                <ul>
                                    {order.options.map(option => <li key={`${order.id}-${option}`}>{option}</li>)}
                                </ul>
                            </ul>
                        )}
                    </ul>
                    <button onClick={confirmSelection}>Confirm</button>
                </div>
            </div>
        );
    }
}

export default Details;
