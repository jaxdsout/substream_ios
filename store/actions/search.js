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

export const auto_search = (search, filter, region) => async (dispatch) => {
    try {
        const searchURI = encodeURIComponent(search);
        const res = await axios.get(`${apiURL}/autocomplete-search/?apiKey=${apiKey}&search_value=${searchURI}&search_type=${filter}&region=${region}`);
        console.log(res.data.results)
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.results });
    } catch (err) {
        dispatch({ type: SEARCH_FAIL });
    }
};

export const load_choice = (id, region) => async (dispatch) => {
    try {
        console.log(`${apiURL}/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources&regions=${region}`)
        const res = await axios.get(`${apiURL}/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources&regions=${region}`);
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






