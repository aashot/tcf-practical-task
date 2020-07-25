import firebase from 'firebase/app';

export default {
    namespaced: true,
    actions: {
        async fetchCampaigns({ commit, dispatch }) {
            // eslint-disable-next-line no-useless-catch
            try {
                const uid = await dispatch('auth/getUserId', null, { root: true });
                const campaigns = (await firebase.database().ref('/users/' + uid + '/campaigns').once('value')).val() || {};
                commit('SET_COMPAIGNS', Object.values(campaigns), { root: true });

                return Object.keys(campaigns).map(key => ({ ...campaigns[key], key }))
            } catch (e) {
                commit('SET_ERROR', e, { root: true });
                throw e;
            }
        },

        async addCampaign({ commit, dispatch }, payload) {
            // eslint-disable-next-line no-useless-catch
            try {
                const uid = await dispatch('auth/getUserId', null, { root: true });
                const snapshot = await firebase.storage().ref('/users/' + uid + '/campaigns/' + payload.campaignId).put(payload.img);
                const snapshotURL = await snapshot.ref.getDownloadURL();

                payload.imgURL = snapshotURL;

                const campaign = await firebase.database().ref('/users/' + uid + '/campaigns').push(payload);

                return Object.assign(payload, { id: campaign.key });
            } catch (e) {
                commit('SET_ERROR', e, { root: true });
                throw e;
            }
        },

        async editCampaign({ commit, dispatch }, payload) {
            // eslint-disable-next-line no-useless-catch
            try {
                const uid = await dispatch('auth/getUserId', null, { root: true });
                if (payload.img) {
                    const snapshot = await firebase.storage().ref('/users/' + uid + '/campaigns/' + payload.campaignId).put(payload.img);
                    const snapshotURL = await snapshot.ref.getDownloadURL();
                    payload.imgURL = snapshotURL;
                }

                await firebase.database().ref('/users/' + uid + '/campaigns').child(payload.key).update(payload);
            } catch (e) {
                commit('SET_ERROR', e, { root: true });
                throw e;
            }
        }
    }
}