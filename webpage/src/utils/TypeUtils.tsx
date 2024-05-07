export type ValueOf<T> = T[keyof T];

export type TypeExcept<T, Disallowed> = T extends Disallowed ? never : T;
