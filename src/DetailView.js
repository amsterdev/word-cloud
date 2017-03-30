import React from 'react';
import CloudItem from './CloudItem';

class DetailView extends React.Component {
	
 	constructor(props) {
    	super(props);
    	this.state = {
    		content: (
				<div>
					<h3 className="detail_view_list_header">
						Topic Summary
					</h3>
					
					<p>(Click on a topic for more detail)</p>
				</div>
				
			)
    	}
  	}

	render () {
		if (this.props.detailView) {
			var topic = this.props.detailView

			function detailViewSentiment () {
				var jsxSentiment = [];
				if (topic.sentiment.positive) {
					jsxSentiment.push(<li className="green_text detail-view-list-item">Postive Mentions: {topic.sentiment.positive}</li>);
				}
				if (topic.sentiment.neutral) {
					jsxSentiment.push(<li className="detail-view-list-item">Neutral Mentions: {topic.sentiment.neutral}</li>);
				}
				if (topic.sentiment.negative) {
					jsxSentiment.push(<li className="red_text detail-view-list-item">Negative Mentions: {topic.sentiment.negative}</li>);
				}
				console.log(jsxSentiment)
				return jsxSentiment;						
			}

  			this.state.content = (
  				<div>
					<h3 className="detail_view_list_header">
						Topic: "{topic.label}"
					</h3>
					<h4 className="detail_view_list_sub_header">
						Total Mentions: {topic.volume}
					</h4>
					<ul className="detail_view_list">
						{detailViewSentiment()}
					</ul>
				</div>
			)
		}

		return (
			<div>
				{this.state.content}
			</div>
		)
	}
}


export default DetailView;
