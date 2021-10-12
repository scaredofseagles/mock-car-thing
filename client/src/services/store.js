import create from "zustand";

const useStore = create(set => ({
  currentUser: null,
  token: null,
  currentlyPlaying: null,
  deviceId: null,
  setCurrentUser: (currentUser) => set({currentUser}),
  setToken: (token) => set({token}),
  setCurrentlyPlaying: (currentlyPlaying) => set({currentlyPlaying}),
  setDeviceId: (deviceId) => set({deviceId})
}))

export default useStore;
