import React from 'react';
import WordCloud from './WordCloud'

class CloudItem extends React.Component {

 	constructor(props) {
    	super(props);
    	this.bringOnTheData = this.bringOnTheData.bind(this);
  	}

    bringOnTheData () {
    	this.props.detailViewHandler(this.props.data);
		var string = "Total Volume: " + this.props.data.volume;

			this.setState(
				{detailViewVolume: this.props.data.volume}
			)
	}

	cloudItemSettings () {
			var topic = this.props.data;
            var classColor = '';

            if (topic.sentimentScore > 60) {
                topic.classColor = " green_text";
            } else if (topic.sentimentScore > 50) {
                topic.classColor = " red_text";
            } else {
                topic.classColor = "";
            }
            //var topicVolume = topic.volume;
            topic.itemClass = topic.classColor + " " + topic.fontSizeClass;
	}

	render (){
		this.cloudItemSettings();
		return  (
			<a className={this.props.data.itemClass} onClick={this.bringOnTheData}>{this.props.data.label}</a>
		)
	}
}

export default CloudItem