// import libs
import React from 'react';
import axios from 'axios';
//import * as d3 from 'd3';

// import modules
import CloudItem from './CloudItem';
import DetailView from './DetailView';
import cloudListPrepare from './cloudListPrepare';

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
        axios
            .get(path)
            .then(function(result) {  
            // we got it!
            console.log('axios', result, result.data.topics);
            var topics = result.data.topics;
            function sortNumber(a,b) {
                return b.volume - a.volume;
            }

            topics.map(function(item){
                var paddingLeft = parseInt((Math.random() * 40), 10);

                var styleSetting = {'marginLeft': paddingLeft + 'px'};

                item.styleSetting = styleSetting;
            })


            topics.sort(sortNumber);
            console.log(topics)

            _this.setState({
                topics
            });
        });
    }

    renderCloudContainer (item, num) {
        //this.setState(item);
        this.state.topic = item;
   

        //console.log(this, item, 'render cloud cont', CloudItem);
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
            topics.forEach(function(item){
                if(item.volume > maxValue) {
                    maxValue = item.volume;
                }
            })

            console.log(maxValue);
            

            function findSizeSettings (topics, num, balanced) {

                /// help from http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
                var numberOfBuckets = numberOfBuckets || 6;
                var chunks = topics.length / (numberOfBuckets/2);
                console.log('chunks', chunks);
                topics.split
                if (num < 2)
                    return [topics];

                var len = topics.length,
                        out = [],
                        i = 0,
                        size;

                if (len % num === 0) {
                    size = Math.floor(len / num);
                    while (i < len) {
                        out.push(topics.slice(i, i += size));
                    }
                }

                else if (balanced) {
                    while (i < len) {
                        size = Math.ceil((len - i) / num--);
                        out.push(topics.slice(i, i += size));
                    }
                }

                else {
                    num--;
                    size = Math.floor(len / num);
                    if (len % size === 0)
                        size--;
                    while (i < size * n) {
                        out.push(topics.slice(i, i += size));
                    }
                    out.push(topics.slice(size * n));

                }
                console.log(out, 'array magic');
                out.forEach(function(arr, i){
                    
                    console.log(arr, 'arr');
                    var interval = arr.length / 2;
                    var maxValue = 0;
                    var minValue = 1000;
                        arr.forEach(function(item) {

                            if(item.volume > maxValue) {
                                maxValue = item.volume;
                            }
                            if (item.volume < minValue) {
                                minValue = item.volume;
                            } 

                        })
                console.log(minValue, maxValue, 'ranges');
                var midPoint =  minValue +  parseInt( ((maxValue - minValue)/2), 10) ;
                console.log(midPoint, 'midPoint')

                        arr.forEach(function(item, j) {
                            if (item.volume > midPoint) {
                                item.myTextSizeClass = 'size-' + (1 + j + i);
                            } else {
                                item.myTextSizeClass = 'size-' + (1 + j + i);
                            }
                            console.log('size here?', item)

                        })

                    /*
                    for (i = 1; i < 2; i++) {
                    if (val <= i*interval) {
                        tpp
                        return 'size-' + i;
                    }
                    */
                });


            
                

                return out;
            }
            var arraySets = findSizeSettings(topics, 3, false);


            /// set size buckets for font-size classes 
            function findBuckets(val, maxValue, numberOfBuckets) {
                
                var numberOfBuckets = numberOfBuckets || 6;
                var interval = maxValue/numberOfBuckets;
                var i;
                for (i = 1; i < (numberOfBuckets + 1); i++) {
                  //  console.log(i*interval)
                    if (val <= i*interval) {
                  //     console.log(val, 'whater', 'size-' + i);
                        return 'size-' + i;
                    }
                }
            }

            var allTopics = topics.map(function(topic, i) {      
                var sizeStyleClass = findBuckets(topic.volume, maxValue);
                topic.fontSizeClass = sizeStyleClass;

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
