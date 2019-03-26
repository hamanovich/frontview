import map from 'lodash/map';

import {
  QLISTS_ADD,
  QLIST_ADD,
  QLIST_GET,
  QLIST_ADD_QUESTION,
  QLIST_REMOVE,
} from '../actions/types';
import { QList } from '../propTypes/QListType';
import { QListActionTypes } from '../actions/qlists';

const initialState: QList[] = [];

export default (state = initialState, action: QListActionTypes): QList[] => {
  switch (action.type) {
    case QLISTS_ADD:
      return action.qlists;

    case QLIST_ADD:
      return [...state, action.qlist];

    case QLIST_GET: {
      const gotIndex = state.findIndex(qlist => qlist._id === action.qlist._id);

      if (gotIndex > -1) {
        return map(state, qlist => {
          if (qlist._id === action.qlist._id) {
            return action.qlist;
          }

          return qlist;
        });
      }

      return [action.qlist];
    }

    case QLIST_ADD_QUESTION: {
      const qlistIndex = state.findIndex(
        qlist => qlist._id === action.qlist._id,
      );

      if (qlistIndex > -1) {
        return map(state, qlist => {
          if (qlist._id === action.qlist._id) {
            return action.qlist;
          }

          return qlist;
        });
      }

      return [action.qlist];
    }

    case QLIST_REMOVE: {
      const removeIndex = state.findIndex(
        qlist => qlist._id === action.qlist._id,
      );

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1),
        ];
      }

      return state;
    }

    default:
      return state;
  }
};
