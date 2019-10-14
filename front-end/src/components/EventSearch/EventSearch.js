import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';

import './EventSearch.css'
import EventCard from '../EventCard/EventCard';
import SearchBar from '../SearchBar/SearchBar'

class EventSearch extends Component {
    state = {
        events: [],
        sortMethod: '',
    }

    async componentDidMount() {
        const url = `${window.apiHost}/events/`
        const axiosResponse = await axios.get(url)
        this.setState({
            events: axiosResponse.data
        })
    }

    changeSortMethod = (e) => {
        this.setState({
            sortMethod: e.target.value
        })
    }

    makeCards = (events) => {
        const cards = events.map((event, i) => {
            // console.log(event)
            return (
                <EventCard key={i} event={event} event_id={event.id} />
            )
        })
        return cards
    }

    filterCards = (events) => {

        return events.filter((event) => {
            // console.log(event)
            // console.log(this.props.search.searching)
            // console.log(event.title.toLowerCase().includes(this.props.search.searching) || event.description.toLowerCase().includes(this.props.search.searching))
            return event.title.toLowerCase().includes(this.props.search.searching) || event.description.toLowerCase().includes(this.props.search.searching)
        })
        // console.log('filterCards')
        // return events
    }
    sortCards = (events) => {
        if (this.state.sortMethod === 'soonest' || this.state.sortMethod === '') {
            // Sort time ascending
            events.sort( (a,b) => moment(a.time).valueOf() - moment(b.time).valueOf());
        } else if (this.state.sortMethod === 'latest') {
            // Sort time descending
            events.sort( (a,b) => moment(b.time).valueOf() - moment(a.time).valueOf());
        } else if (this.state.sortMethod === 'newest') {
            // Sort newest created
            events.reverse();
        // } else if (this.state.sortMethod === 'oldest') {
        //     // Sort oldest created
        } else if (this.state.sortMethod === 'cheapest') {
            // Sort price ascending
            events.sort( (a,b) => a.price - b.price);
        } else if (this.state.sortMethod === 'priciest') {
            // Sort price descending
            events.sort( (a,b) => b.price - a.price);
        }

        // Sort name ascending
        // events.sort( (a,b) => {
        //     if(a.title < b.title) { return -1; }
        //     if(a.title > b.title) { return 1; }
        //     return 0;}
        // );

        // Sort name descending
        // events.sort( (a,b) => {
        //     if(a.title < b.title) { return 1; }
        //     if(a.title > b.title) { return -1; }
        //     return 0;}
        // );

        return events
    }

    render() {
        const filteredCards = this.filterCards(this.state.events);
        const sortedCards = this.sortCards(filteredCards);
        const eventCards = this.makeCards(sortedCards);

        return (
                <div className='row green lighten-3'>
                    <div className='col'>
                    <section>
                        <h3 className="move-content-down">Search for an event!</h3>
                        <SearchBar />
                        <div className="input-field col s8 offset-s2" >
                            <select className='browser-default' value={this.state.sortMethod} onChange={this.changeSortMethod}>
                                    <option value="soonest">Date-Ascending</option>
                                    <option value="latest">Date-Descending</option>
                                    <option value="newest">Created-Ascending</option>
                                    <option value="oldest">Created-Descending</option>
                                    <option value="cheapest">Price-Ascending</option>
                                    <option value="priciest">Price-Descending</option>
                            </select>
                            <label className='active' id='event-search-label'>Sort by:</label>                        
                            <h5>Filtering by: "{this.props.search.searching}"</h5>
                        </div>
                        <div className="section col s12 m12">
                            {eventCards}
                        </div>
                        </section>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth,
        search: state.search
    })
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({

//     })
// }

export default connect(mapStateToProps,
    // mapDispatchToProps
    null
)(EventSearch);