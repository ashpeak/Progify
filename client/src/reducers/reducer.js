export default function user (state = [], action) {
    if(action.type === "add_user"){
        return action.user;
    }
    return state;
}