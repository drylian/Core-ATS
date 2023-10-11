import { createStore, action } from 'easy-peasy';

const user = {
    data: undefined,

    setUser: action((state, payload) => {
        state.data = { ...payload };
    }),
    delUser:action((state) => {
        state.data = undefined;
    }),
};

export default user;