// import libs
import React from 'react';
import axios from 'axios';

// import modules
import CloudItem from './CloudItem';
import DetailView from './DetailView';

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
            _this.setState({
                topics: result.data.topics
            });
        });
    }

    renderCloudContainer (item, num) {
        //this.setState(item);
        this.state.topic = item;
        //console.log(this, item, 'render cloud cont', CloudItem);
        return (<span key={num} className="item_container">
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
            })

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
