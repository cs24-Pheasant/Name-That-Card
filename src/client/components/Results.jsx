import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import * as gamePlayActions from '../actions/gamePlayActions';

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

  let socialMediaDialog = `I scored ${score} out of 20 on @namethatcard : ${selectedGame} Edition! Score 18/20 or higher and you could win a Jace, the Mind Sculptor!! Test your skills at www.namethatcard.com`;

  const socialMediaHashtags = [`${selectedGame}`, 'namethatcard'];

  return (
    <div>
      <h1 className="resultHeader--center">You got {score} points!</h1>
      <div className="result--center">
        <h2 className="text--center">Score 18/20 or Better, then Share Below on Twitter or FB to Enter our Raffle!</h2>
        <div className="center">
          <FacebookShareButton url={'https://www.namethatcard.com'} quote={socialMediaDialog} hashtag={'#namethatcard'}>
            <FacebookIcon round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={'https://www.namethatcard.com'} title={socialMediaDialog} hashtags={socialMediaHashtags}>
            <TwitterIcon round={true} />
          </TwitterShareButton>
        </div>
      </div>
      {joinLeaderboardMsg}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
