import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { createContext, useMemo } from 'react'

import { setFormItem } from '../state_slices/formState'

type Props = {
  children: JSX.Element | JSX.Element[];
  cacheLocation: 'formState';
};

type ICacheContext = {
  setItem: ActionCreatorWithOptionalPayload<
    { name: string; value: unknown }
  > | ActionCreatorWithPayload<
    { name: string; value: unknown }
  >
};

export const CacheContext = createContext<ICacheContext|null>(null)

// This cache should be able to store to more than one position,
// just add similar state slices to the store
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GlobalCache({ cacheLocation, children }: Props) {

  const setItem = useMemo(() => {
    //   switch (cacheLocation) {
    //     case 'filterState':
    //       return { setItem: setFilterItem }
    //     case 'formState':
    //       return { setItem: setFormItem }
    //     case 'userState':
    //       return { setItem: setUserItem }
    //   }
    return { setItem: setFormItem }
  }, [])

  return (
    <CacheContext.Provider value={ setItem }>
      {children}
    </CacheContext.Provider>
  )
}

export default GlobalCache
