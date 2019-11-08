import React, {Component} from 'react';
import file from './sidebar/data';
class MyFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() { 
        var data = `
        <html>
            <head>
            </head>
            <body>
                <p>Hello thinh</p>
                <h1>This is H1 </h1>
                <img src = "https://image.thanhnien.vn/660/uploaded/congthang/2019_07_16/p1_nptz.jpg" alt = "anh" />
            </body>
        </html>
        `   
        return ( 
            <iframe srcDoc = {data} style={{display:'flex', flex :'1', height :'100%', width: '100%', background: 'white'}}></iframe>
        );
    }
}
 
export default MyFrame;