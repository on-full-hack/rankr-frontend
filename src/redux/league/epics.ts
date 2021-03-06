import {Epic} from 'redux-observable';
import {isActionOf, ActionType} from 'typesafe-actions';
import {mergeMap, filter} from 'rxjs/operators';
import Types from 'MyTypes';
import * as actions from './actions';
import {API} from '../../API';

const createLeagueEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.createLeague)),
    mergeMap(async action => {
      const league = await API.createLeague(action.payload.league);
      console.log('league: ', league);
      return actions.createLeagueSuccess(league);
    })
  );

const fetchLeaguesEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchLeagues)),
    mergeMap(async action => {
      const leagues = await API.getAllLeagues();
      return actions.fetchLeaguesSuccess(leagues);
    })
  );

const fetchLeagueDetailsEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchLeagueDetails)),
    mergeMap(async action => {
      console.log(' in epic');
      const leagueDetails = await API.getLeagueDetails(action.payload.id);
      console.log('leagueDetails: ', leagueDetails);
      return actions.fetchLeagueDetailsSuccess(leagueDetails);
    })
  );

const jointoLeagueEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.joinToLeague)),
    mergeMap(async action => {
      const response = await API.joinToLeague(action.payload.id);
      if (response.status === 201) {
        return actions.joinToLeagueSuccess();
      }

      return actions.joinToLeagueError();
    })
  );

const joinToLeagueByLinkEpic: Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.joinToLeagueByLink)),
    mergeMap(async action => {
      await API.joinToLeagueByLink(action.payload.code);
      return actions.joinToLeagueSuccess();
    })
  );

export default [
  createLeagueEpic,
  fetchLeaguesEpic,
  fetchLeagueDetailsEpic,
  jointoLeagueEpic,
  joinToLeagueByLinkEpic
];
