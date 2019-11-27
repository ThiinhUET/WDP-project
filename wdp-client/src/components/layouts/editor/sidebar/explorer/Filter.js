import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import defaultStyles from './defaultStyles';
import { defaultdata } from './data';

import { dataFlow } from '../../../../../services';

export const defaultMatcher = (filterText, node) => {
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const findNode = (node, filter, matcher) => {
    return matcher(filter, node) || 
        (node.children && 
            node.children.length &&
            !!node.children.find(child => findNode(child, filter, matcher)));
};

export const filterTree = (node, filter, matcher = defaultMatcher) => {
    if (matcher(filter, node) || !node.children) {
        return node;
    }
    const filtered = node.children
        .filter(child => findNode(child, filter, matcher))
        .map(child => filterTree(child, filter, matcher));
    return Object.assign({}, node, {children: filtered});
};

export const expandFilteredNodes = (node, filter, matcher = defaultMatcher) => {
    let children = node.children;
    if (!children || children.length === 0) {
        return Object.assign({}, node, {toggled: false});
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    const shouldExpand = childrenWithMatches.length > 0;
    if (shouldExpand) {
        children = childrenWithMatches.map(child => {
            return expandFilteredNodes(child, filter, matcher);
        });
    }
    return Object.assign({}, node, {
        children: children,
        toggled: shouldExpand
    });
};

class Filter extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
        }))
    }

    onFilterMouseUp({ target: { value } }) {
        const filter = value.trim();
        if (!filter) {
            return dataFlow.next(this.state.data);
        }
        let filtered = filterTree(this.state.data, filter);
        filtered = expandFilteredNodes(filtered, filter);
        dataFlow.next(filtered);
    }
    
    render() {
        return (
            <div style={defaultStyles.searchBox}>
                <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="input-group-addon" style={{ color: '#aeafad', padding: '5px' }}>
                        <i className="fa fa-search" />
                    </span>
                    <input
                        id="searchBox"
                        className="form-control"
                        onKeyUp={this.onFilterMouseUp.bind(this)}
                        autoComplete="off"
                        placeholder="Search the file..."
                        spellCheck="false"
                        type="text"
                        style={{ outline: 'none', padding: '0px 5px', width: '75%' }}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Filter);