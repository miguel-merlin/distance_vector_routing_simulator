export type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>
export type RStateHook<T> = [T, StateDispatch<T>]