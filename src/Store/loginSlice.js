const user_name = localStorage.getItem('name') || 'Anonymous';
const email = localStorage.getItem('email') || 'anonymous@gmail.com';
const contactno = localStorage.getItem('contact') || '000 000 000';
const islogin = localStorage.getItem('islogin') === 'true';

const { createSlice } = require("@reduxjs/toolkit")
const loginSlice = createSlice({
    name: "login",
    initialState: {
        islogin: islogin,
        email: email,
        username: user_name,
        contactnumber: contactno
    },
    reducers: {
        add(state, action) {
            localStorage.setItem('name', action.payload[2]);
            localStorage.setItem('email', action.payload[0]);
            localStorage.setItem('contact', action.payload[1]);
            localStorage.setItem('islogin', true);
            return { islogin: true, email: action.payload[0], username: action.payload[2], contactnumber: action.payload[1] };
        },
        remove() {
            localStorage.setItem('name', 'Anonymous');
            localStorage.setItem('email', 'anonymous@gmail.com');
            localStorage.setItem('contact', '000 000 000');
            localStorage.setItem('islogin', false);
            return { islogin: false, email: "", username: '', contactnumber: '000 000 000' };
        }
    }
});

export const { add, remove } = loginSlice.actions;
export const loginreducer = loginSlice.reducer;
