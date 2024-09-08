import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { TStore, TDispatch } from './state';

export const useAppDispatch = () => useDispatch<TDispatch>();
export const useAppSelectors: TypedUseSelectorHook<TStore> = useSelector;