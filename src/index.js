import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyCPOL-HN0ku0UGAsbQ6RjMYWIX2ezsatgk'



//create component which produce html

class App extends Component {
	constructor (props){
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('Sandeep Maheshwari')
	}
	videoSearch(term){
		YTSearch({key: API_KEY,term: term},(data) => {
			this.setState( {
				videos: data,
				selectedVideo: data[0]
				 } );
		});
	}
	render (){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
		return(
	 	<div>
			<SearchBar onSearchTermChange = {videoSearch}/>
			<VideoDetail video = {this.state.selectedVideo}/>
			<VideoList className="video-list-container"
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos= {this.state.videos}/>
		</div> //html like code is JSX which is transpiled by  web pack and babel which gets converted to vanella javascript
	);
	}

}

//Take the component generated html and put it on the page(in the DOM)
// App is a class ans <App /> is an instance of the class

ReactDOM.render(<App />, document.querySelector('.container'));
