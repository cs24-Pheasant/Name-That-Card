import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LeaderboardEntry from './LeaderboardEntry.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  results: store.leaderboardReducer.results,
  sortDirection: store.leaderboardReducer.sortDirection,
  sortCategory: store.leaderboardReducer.sortCategory,
  leaderboardDifficulty: store.leaderboardReducer.leaderboardDifficulty,
});

const mapDispatchToProps = dispatch => ({
  changeLeaderboardSortCategory: (category) => {
    dispatch(leaderboardActions.changeLeaderboardSortCategory(category));
  },
  toggleSortDirection: () => {
    dispatch(leaderboardActions.toggleSortDirection());
  },
  resetLeaderboardConfig: () => {
    dispatch(leaderboardActions.resetLeaderboardConfig());
  },
});

class Leaderboard extends Component {

  componentDidMount() {
    const { resetLeaderboardConfig } = this.props;
    resetLeaderboardConfig();
  }

  render() {
    const { changeLeaderboardDifficulty, leaderboardDifficulty, results, sortCategory, changeLeaderboardSortCategory, sortDirection } = this.props;
    const selectedGameRoute = `/gameMenu/${window.location.pathname.slice(13)}`;
    let difficultyFilteredResults = [];

    results.forEach((resultsObj, i) => {
      if(resultsObj.difficulty_level === leaderboardDifficulty) {
        difficultyFilteredResults.push(resultsObj)
      }
    });

    console.log('results ', difficultyFilteredResults)

    function sortResults(arr) {
      if (sortCategory === 'user') {
        if (sortDirection) {
          return arr.sort((a, b) => {
            if(a.user === null) {
              a.user = '';
            }
            if(b.user === null) {
              b.user = '';
            }
            const x = a.user.toLowerCase();
            const y = b.user.toLowerCase();
            if(x < y) {return -1;}
            if(x > y) {return 1;}
            return 0;
          })
        }
        return arr.sort((a, b) => {
          if(a.user === null) {
            a.user = '';
          }
          if(b.user === null) {
            b.user = '';
          }
          const x = a.user.toLowerCase();
          const y = b.user.toLowerCase();
          if(x > y) {return -1;}
          if(x < y) {return 1;}
          return 0;
        })
      }
      if (sortDirection) {
        return arr.sort((a, b) => Number(b[sortCategory]) - Number(a[sortCategory]));
      }
      return arr.sort((a, b) => Number(a[sortCategory]) - Number(b[sortCategory]));
    }

    difficultyFilteredResults = sortResults(difficultyFilteredResults);

    const leaderboardEntries = difficultyFilteredResults.map((resultObj, i) => {
      return <LeaderboardEntry numEntries={difficultyFilteredResults.length} key={i} entryContents={resultObj} rank={i} sortDirection={sortDirection}/>;
    })
    let all = <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('ALL')}>ALL</span>;
    let easy = <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span>;
    let medium = <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span>;
    let hard = <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span>;
    
    if(leaderboardDifficulty === 'ALL') {
      all = <span className="activeLeaderboardFilter" onClick={() => changeLeaderboardDifficulty('ALL')}>ALL</span>;
    } else if (leaderboardDifficulty === 'EASY') {
      easy = <span className="activeLeaderboardFilter" onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span>;
    } else if (leaderboardDifficulty === 'MEDIUM') {
      medium = <span className="activeLeaderboardFilter" onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span>;
    } else if (leaderboardDifficulty === 'HARD') {
      hard = <span className="activeLeaderboardFilter" onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span>;
    }

    return (
      <div className="LeaderboardContainer">
        <h1 className="leaderboardTitle">LEADERBOARD</h1>
        <div className="leaderboard-right-menu">
          <div className="xButton"><NavLink to={selectedGameRoute}>x</NavLink></div>
        </div>
        <div>
          <div className="center-leaderboardFilter">
            {all}
            {easy}
            {medium}
            {hard}
            {/* <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('ALL')}>ALL</span>
            <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span>
            <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span>
            <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span> */}
          </div>
        </div>
        <div className="leaderboardPosition">
          <table className="leaderboard">
            <tbody className="leaderboard-body">
              <tr>
                <th className="leaderboardHeaders">RANK</th>
                <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('user')}>PLAYER</th>
                <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('sum')}>TOTAL PTS</th>
                <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('avg')}>AVG SCORE</th>
                <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('gamecount')}>TOTAL GAMES</th>
              </tr>
              {leaderboardEntries}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
