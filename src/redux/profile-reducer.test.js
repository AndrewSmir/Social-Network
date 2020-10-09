import profileReducer, {
    addPostActionCreator,
    deletePost,
    setUserProfile,
    setUserProfileStatus
} from "./profile-reducer";

//test data
let state = {
    postData: [
        {id: 1, message: 'Hi, how are you?', likes: 300},
        {id: 2, message: "It's my first post", likes: 20},
        {id: 3, message: "It's my first post", likes: 20}
    ],
    profile: null
}

test('user profile should be set', () => {
    let action = setUserProfile({
        aboutMe: null,
        contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null},
        fullName: "hopeless_runner",
        lookingForAJob: false,
        lookingForAJobDescription: null,
        photos: {small: null, large: null},
        userId: 11727
    })

    let newState = profileReducer(state, action)

    expect(newState.profile).toStrictEqual({
        aboutMe: null,
        contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null},
        fullName: "hopeless_runner",
        lookingForAJob: false,
        lookingForAJobDescription: null,
        photos: {small: null, large: null},
        userId: 11727
    })
})

test('new post should be added', () => {
    let action = addPostActionCreator('Yo yo yo');
    //test action
    let newState = profileReducer(state, action)
    // test result
    expect(newState.postData.length).toBe(4)
})

test('text of new post should be correct', () => {
    let action = addPostActionCreator('Yo yo yo');
    // test action
    let newState = profileReducer(state, action)
    // test result
    expect(newState.postData[3].message).toBe('Yo yo yo')
})

test('after deleting length of postData should be decremented', () => {
    let action = deletePost(3)
    let newState = profileReducer(state, action)
    // test result
    expect(newState.postData.length).toBe(2)
})

test('user profile status be added', () => {
    let action = setUserProfileStatus('User status is....');
    //test action
    let newState = profileReducer(state, action)
    // test result
    expect(newState.profileStatus).toBe('User status is....')
})


