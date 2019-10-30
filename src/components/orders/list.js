import React from 'react';

const OrderList = ({ orders }) =>
    <table>
        <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Description</td>
            <td>Color</td>
            <td>Options</td>
        </tr>
        </thead>
        <tbody>
        {orders.map(item =>
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.color}</td>
                <td>{item.options.join(', ')}</td>
            </tr>)
        }
        </tbody>
    </table>;

export default OrderList;