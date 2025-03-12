import {
    LOAD_CHOICE_FAIL,
    LOAD_CHOICE_SUCCESS,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    CLEAR_SEARCH,
    BACK_TO_RESULTS,
    CHANGE_FILTER,
    SET_SEARCH_STRING

} from '../actions/types'

import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiURL = process.env.EXPO_PUBLIC_API_URL;

export const auto_search = (searchString, filter, region) => async (dispatch) => {
    try {
        const string = encodeURIComponent(searchString);
        const res = await axios.get(`${apiKey}/autocomplete-search/?apiKey=${apiURL}&search_value=${string}&search_type=${filter}&region=${region}}`);
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.results });
        console.log(res.data.results)
    } catch (err) {
        dispatch({ type: SEARCH_FAIL });
    }
};

export const load_choice = (id, region) => async (dispatch) => {
    try {
        const res = await axios.get(`${apiKey}/title/${id}/details/?apiKey=${apiURL}&append_to_response=sources&regions=${region}`);
        dispatch({ type: LOAD_CHOICE_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: LOAD_CHOICE_FAIL });
    }
};

export const clear_search = () => dispatch => {
    dispatch({
        type: CLEAR_SEARCH
    });
    return Promise.resolve();
};

export const back_to_results = () => dispatch => {
    dispatch({
        type: BACK_TO_RESULTS
    });
    return Promise.resolve();
}

export const change_filter = (value) => dispatch => {
    dispatch({
        type: CHANGE_FILTER, payload: value
    });
    return Promise.resolve();
}

export const set_search_string = (value) => dispatch => {
    dispatch({
        type: SET_SEARCH_STRING, payload: value
    });
    return Promise.resolve();
}






