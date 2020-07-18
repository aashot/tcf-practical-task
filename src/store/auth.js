import firebase from 'firebase/app';

export default {
    namespaced: true,
    actions: {
        async login({ commit }, { email, password }) {
            // eslint-disable-next-line no-useless-catch
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                commit('SET_CURRENT_USER', user, { root: true });
                commit('SET_THEME_BLUE', null, { root: true });
            } catch (e) {
                commit('SET_ERROR', e, { root: true });
                throw e;
            }
        },

        async logout({ commit }) {
            await firebase.auth().signOut();
            commit('REMOVE_CURRENT_USER', null, { root: true });
            commit('SET_THEME_BLUE', null, { root: true });
        },

        async signup({ dispatch, commit }, { email, password, name }) {
            // eslint-disable-next-line no-useless-catch
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUserId');
                await firebase.database().ref(`/users/${uid}/info`).set({ name })
                await firebase.auth().currentUser.sendEmailVerification({ url: 'http://localhost:8080/', })
            } catch (e) {
                commit('SET_ERROR', e, { root: true });
                throw e;
            }
        },

        getUserId() {
            const user = firebase.auth().currentUser;
            return user ? user.uid : null;
        }
    }
}