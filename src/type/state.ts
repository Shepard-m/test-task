import { store } from '../store';
import { reducer } from '../store/reduser'; 

export type TStore = ReturnType<typeof reducer>;
export type TDispatch = typeof store.dispatch;