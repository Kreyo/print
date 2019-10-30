import React from 'react';
import './App.css';
import Popup from './components/popup/popup';
import Selection from './components/sections/selection';
import Details from './components/sections/details';
import Confirmation from './components/sections/confirmation';
import OrderList from './components/orders/list';
import mockData from './mocks';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            stage: 0,
            orders: [],
            items: [],
            selectedOrders: [],
        };
        this.setState = this.setState.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addSelectedOrders = this.addSelectedOrders.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
    }

    componentDidMount() {
        // API call goes here! like axios.get('/api/orders').then...;
        this.setState({ items: mockData });
    }

    addOption(orderId, option) {
        const { selectedOrders } = this.state;
        const index = selectedOrders.findIndex(item => item.id === orderId);
        if (!selectedOrders[index].options) {
            selectedOrders[index].options = [];
        }
        selectedOrders[index].options.push(option);
        this.setState({ selectedOrders });
    }

    updateSelection(selectedOrder) {
        const { selectedOrders } = this.state;
        const selectedIndex = selectedOrders.findIndex(item => item.id === selectedOrder.id);
        if (selectedIndex !== -1) {
            selectedOrders.splice(selectedIndex);
        } else {
            selectedOrders.push(selectedOrder);
        }

        this.setState({ selectedOrders });
    }

    addSelectedOrders() {
        const { selectedOrders, orders } = this.state;
        // Another API call goes here! like axios.post('/api/orders/add', selectedOrder).then...;
        const updatedOrders = [...orders, ...selectedOrders];
        this.setState({
            orders: updatedOrders,
            selectedOrders: [],
            popup: false,
            stage: 0,
        });
    }

    renderPopupSection(stage) {
        switch (stage) {
            case 0:
                return <Selection
                    items={this.state.items}
                    updateSelection={selectedOrder => this.updateSelection(selectedOrder)}
                    selectedOrders={this.state.selectedOrders}
                    onNextClick={() => this.setState({ stage: 1 })}
                />;
            case 1:
                return <Details
                    selectedOrders={this.state.selectedOrders}
                    addOption={this.addOption}
                    onNextClick={() => this.setState({ stage: 2 })}
                    onPrevClick={() => this.setState({ stage: 0 })}
                />;
            case 2:
                return <Confirmation
                    selectedOrders={this.state.selectedOrders}
                    confirmSelection={this.addSelectedOrders}
                    onPrevClick={() => this.setState({ stage: 0 })}
                />;
            default:
                return <div>Not found!</div>;
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.popup &&
                <Popup
                    onClose={() => this.setState({ popup: false })}
                >
                    { this.renderPopupSection(this.state.stage) }
                </Popup>}
                <header className="app-header">
                    <span>Test app!</span>
                </header>
                <div className="container">
                    <div className="controls">
                        <button onClick={() => this.setState({ popup: true })}>Import orders</button>
                    </div>
                    <h1>My orders</h1>
                    {this.state.orders.length ? <OrderList orders={this.state.orders}/> : 'Nothing here yet :('}
                </div>
            </div>
        );
    }
}

export default App;
