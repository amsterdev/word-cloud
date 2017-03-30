// import libs
import React from 'react';
import axios from 'axios';

//import * as d3 from 'd3';

// import modules
import CloudItem from './CloudItem';
import DetailView from './DetailView';
var cloudListPrepare = require('./cloudListPrepare');


//var cloudListPrepare = require('cloudListPrepare.js');

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
        //cloudListPrepare([2,5,5])
        console.log(cloudListPrepare, 'now this')
        axios
            .get(path)
            .then(function(result) {  
            // we got it!
            console.log('axios', result, result.data.topics);
            var topics = result.data.topics;

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
//            var topicFontSizeList = bucketSize(topics);
            //console.log(topics, typeof topics, topics instanceof Array);
            var maxValue = 0;

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
                nothing here
            </div>
        );
    }
};

export default WordCloud;
