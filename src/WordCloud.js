import React from 'react';
import axios from 'axios';

// import modules
import CloudItem from './CloudItem';
import DetailView from './DetailView';
var cloudListPrepare = require('./cloudListPrepare');

class WordCloud extends React.Component {

    constructor(props) {
        super(props)
        this.detailViewHandler = this.detailViewHandler.bind(this);
        this.state = {
            detailView: null
        }
    }

    detailViewHandler (item) {
        //console.log(item.label,  'in parent', item);
        this.setState({
            detailView: item
        });
    }

    componentDidMount () {
        var path = 'data/topics.json';
        var _this = this;
        //  fetch data when component ready
        axios
            .get(path)
            .then(function(result) {  
            var topics = result.data.topics;
            // preparing list for setting various styles and attrs
            var updatedTopics = cloudListPrepare(topics);
            topics = updatedTopics;
            _this.setState({
                topics
            });
        });
    }

    renderCloudContainer (item, num) {
        this.state.topic = item;
   
        return (<span key={num} style={item.styleSetting} className="item_container">
                    <CloudItem
                        data={item}
                        detailViewHandler={this.detailViewHandler}
                    />
                </span>)
    }

    renderDetailView () {    
        return(
            <div className="cloudDetail">
                <DetailView />
            </div>   
        )
    }
 
    render () {
        ///var payment = mortgage.getResultData(this.state.principal, this.state.years, this.state.rate);
        var _this = this;
       // var d3 = require("d3");


        if (this.state && this.state.topics) {
            var topics = this.state.topics;

            // find largest size of value determining font size
            var allTopics = topics.map(function(topic, i) {      
                //var sizeStyleClass = findBuckets(topic.volume, maxValue);
                // topic.fontSizeClass = sizeStyleClass;

                return _this.renderCloudContainer(topic, i);        
            });

            return(
                 <div className="clearfix">
                    <div className="word_cloud_container">
                        {allTopics}
                    </div> 
                    <div className="detail_view_container">
                        <DetailView detailView={this.state.detailView} />
                    </div>
                 </div>
            )
        }

        return (
            <div className="content">
                nothing here (something has gone wrong!)
            </div>
        );
    }
};

export default WordCloud;
