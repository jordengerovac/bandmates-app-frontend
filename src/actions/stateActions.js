export function saveState (state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('bandmates_state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
};

export function loadState() {
    try {
      const serializedState = localStorage.getItem('bandmates_state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
};