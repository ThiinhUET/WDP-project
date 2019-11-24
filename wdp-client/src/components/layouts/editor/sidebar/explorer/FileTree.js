import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// import { includes } from 'lodash';
import { Treebeard, decorators } from 'react-treebeard';
import defaultStyles from './defaultStyles';
import { defaultdata } from './data';
import Header from './Header';
import Toggle from './Toggle';
import DataLoading from './data'

import { dataFlow } from '../../../../../services';

class NewTree extends PureComponent {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
            isLoading: false,
        };
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        this.dataFlowSub = dataFlow.subscribe((value) => {
            this.setState({ data: value });
        });
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
        }))
    }

    componentWillUnmount() {
        if (this.dataFlowSub) {
            this.dataFlowSub.unsubscribe();
            this.dataFlowSub = null;
        }
    }

    onToggle(node, toggled) {
        const { cursor, data } = this.state;
        
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        if (node.type !== 'folder'){
            this.props.history.push({
                state: { ...this.props.location.state, cursor: node }
            });
        } 
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
        this.setState({data: this.props.location.state.data});
        document.getElementById("searchBox").value = null;
    }

    render() {
        const { data } = this.state;
        return (
            <div style={defaultStyles.component}>
                <DataLoading />
                <Treebeard
                    style={defaultStyles}
                    data={data}
                    onToggle={this.onToggle}
                    decorators={{ ...decorators, Toggle, Header }}
                />
            </div>
        );
    }
}

export default withRouter(NewTree);
