import api from '../api';

import { CANDIDATES_ADD, CANDIDATE_ADD, CANDIDATE_REMOVE } from './types';

export const addCandidates = candidates => ({
  type: CANDIDATES_ADD,
  candidates
});

export const candidateAdded = candidate => ({
  type: CANDIDATE_ADD,
  candidate
});

export const candidateRemoved = candidate => ({
  type: CANDIDATE_REMOVE,
  candidate
});

export const candidateAdd = candidate =>
  dispatch => api.candidates.add(candidate)
    .then(candidate => dispatch(candidateAdded(candidate)));

export const getCandidates = _id =>
  dispatch => api.candidates.getByInterviewer(_id)
    .then(candidates => dispatch(addCandidates(candidates)));

export const removeCandidate = _id =>
  dispatch => api.candidates.remove(_id)
    .then(candidate => dispatch(candidateRemoved(candidate)));