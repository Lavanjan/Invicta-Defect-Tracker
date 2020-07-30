import {ADD_DEFECT,VIEW_DEFECT_ADD_DRAWER_FORM,CLOSE_DEFECT_ADD_DRAWER_FORM} from './../type/TypesDefect'

const initialState = {
    defect: [],
    msg: '',
    defectAddFormShowValue:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_DEFECT:
            return {
                ...state,
                msg: action.payload.msg,
            };
        case VIEW_DEFECT_ADD_DRAWER_FORM:
            return {
                ...state,
                defectAddFormShowValue: action.payload.defectAddFormShowValue
            }
        case CLOSE_DEFECT_ADD_DRAWER_FORM:
            return {
                ...state,
                defectAddFormShowValue: action.payload.defectAddFormShowValue
            }
        default:
            return state;
    }
} 