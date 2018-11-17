import React from 'react';
import { connect } from 'react-redux';
import * as gamePlayActions from '../actions/gamePlayActions';
import { NavLink } from 'react-router-dom';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  selectedGame: store.gameListReducer.selectedGame,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
});

const mapDispatchToProps = dispatch => ({
  sendResult: (gameInfo) => {
    dispatch(gamePlayActions.sendResult(gameInfo));
  },
});

const Results = (props) => {
  const { score, sendResult, loggedInUser, selectedGame, selectedDifficulty, isLoggedIn } = props;

  const gameResultInfo = {
    username: loggedInUser,
    game: selectedGame,
    level: selectedDifficulty,
    score: score,
  };

  let joinLeaderboardMsg = <div className="text--center"><NavLink to="/signup">Sign up</NavLink> or <NavLink to="/login">login</NavLink> to join the leaderboard!</div>;

  if (isLoggedIn) {
    sendResult(gameResultInfo);
    joinLeaderboardMsg = '';
  }

  return (
    <div>
      <h1 className="resultHeader--center">You got {score} points!</h1>
      <div className="result--center">
        <h2 className="text--center">Score 18/20 or Better, then Share Below on Twitter or FB to Enter our Raffle!</h2>
        <div className="center">
          <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank"><img className="imgLink" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png"></img></a>
          <a href="https://twitter.com/home?status=" target="_blank"><img className="imgLink" src="https://cdn1.iconfinder.com/data/icons/iconza-circle-social/64/697029-twitter-512.png"></img></a>
        </div>
      </div>
      {joinLeaderboardMsg}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
