import React, {Fragment, PureComponent} from 'react';
import {includes} from 'lodash';
import {Treebeard, decorators} from 'react-treebeard';
import {Div} from 'react-treebeard/dist/components/common';
import data from './data';
import defaultStyles from './defaultStyles'
import * as filters from './filter';
import Header from './Header';
import Toggle from './Toggle';
import NodeViewer from './NodeViewer';
import axios from 'axios';

class NewTree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data
        };
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount(){
        axios.post('http://localhost:8080/git/user-listfile', {accessToken : localStorage.getItem('accessToken'), 
        login: localStorage.getItem('username'), repo : this.state.projectToOpen
    }).then((res) => {
        this.setState({data: res});
        console.log(res);
    })
    }

    onToggle(node, toggled) {
        const {cursor, data} = this.state;

        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    onSelect(node) {
        const {cursor, data} = this.state;

        if (cursor) {
            this.setState(() => ({cursor, active: false}));
            if (!includes(cursor.children, node)) {
                cursor.toggled = false;
                cursor.selected = false;
            }
        }

        node.selected = true;

        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    onFilterMouseUp({target: {value}}) {
        const filter = value.trim();
        if (!filter) {
            return this.setState(() => ({data}));
        }
        let filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState(() => ({data: filtered}));
    }

    render() {
        const {data, cursor} = this.state;
        return (
            <Fragment>
                <Div style={defaultStyles.searchBox}>
                    <Div className="input-group" style={{display: 'flex', alignItems: 'center'}}>
                        <span className="input-group-addon" style={{color: '#aeafad', padding: '5px'}}>
                            <i className="fa fa-search"/>
                        </span>
                        <input
                            className="form-control"
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                            placeholder="Search the file..."
                            type="text"
                            style={{outline: 'none', padding: '0px 5px', width: '75%'}}
                        />
                    </Div>
                </Div>
                <Div style={{position: 'fixed', marginTop: '35px', height: '25px', width: '200px', backgroundColor: 'rgb(60,60,60)'}}></Div>
                <Div style={defaultStyles.component}>
                    <Treebeard
                        style={defaultStyles}
                        data={data}
                        onToggle={this.onToggle}
                        onSelect={this.onSelect}
                        decorators={{...decorators, Toggle, Header}}
                        customStyles={{
                            header: {
                                title: {
                                    color: 'red'
                                }
                            }
                        }}
                    />
                </Div>
                <NodeViewer node={cursor}/>
            </Fragment>
        );
    }
}

export default NewTree;
