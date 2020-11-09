const initiateState = {}

export type InitialStateType = typeof initiateState

const sidebarReducer = (state = initiateState, action: any): InitialStateType => {
    switch (action.type){
        default:
            return state
    }
}

export default sidebarReducer