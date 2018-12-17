import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';
import cards from '../data/scryfall-arena-cards-map.json'

function mapStateToProps(state) {
  return {
  counter: state.counter,
  cards: Object.values(cards).filter(
    card => Object.values(state.filters).every(
      filter => filter.values.some(
        val => filter.comp(card[filter.key], val) || (
          card.card_faces && card.card_faces.some(
            face => filter.comp(face[filter.key], val)
            )
          )
      )
    )
  )
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
