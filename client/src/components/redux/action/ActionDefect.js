import {ADD_DEFECT,VIEW_DEFECT_ADD_DRAWER_FORM,CLOSE_DEFECT_ADD_DRAWER_FORM} from './../type/TypesDefect'
import axios from 'axios';

export const adddefect = defect => dispatch => {
    axios.post('http://localhost:5000/defects/add', defect, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
      .then(res =>
        dispatch({
          type: ADD_DEFECT,
          payload: {msg:'Successfully add a defect',data:defect}
        })
      )
      .catch(err =>
        dispatch({
          type: ADD_DEFECT,
          payload: {msg:'Error to add a defect',data:null}
        })
      );
  }; 

  //add form show value set functions

export const viewDefectAddDrawerForm = () => dispatch => {
  dispatch({
    type: VIEW_DEFECT_ADD_DRAWER_FORM,
    payload: { defectAddFormShowValue: true }
  })
}

export const closeDefectAddDrawerForm = () => dispatch => {
  dispatch({
    type: CLOSE_DEFECT_ADD_DRAWER_FORM,
    payload: { defectAddFormShowValue: false }
  })
}