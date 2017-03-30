var React = require('react');
var ReactDOM = require('react-dom');

import Header from './Header';
import WordCloud from './WordCloud';
import DetailView from './DetailView';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="cloud_container clearfix">
                <Header title="Word Cloud Sample"/>
                <WordCloud update={this.handler}/>
            </div>
        );
    }
};

ReactDOM.render(<App/>,  document.getElementById("app"));