/* eslint-disable security/detect-object-injection */
import { createSlice } from '@reduxjs/toolkit'

/**
 * Form state stores form data globally, which can be applied to
 * multi-page forms. When the user comes back, they will still see the same
 * values
 */

export const cacheSlice = createSlice({
  initialState: {},
  name: 'formState',
  reducers: {
    setForm: (
      state,
      action: {
        payload: object;
      }
    ) => {
      for (const [k, v] of Object.entries(action.payload))
        if (!Number.isNaN(Number(v)))
          state[k] = Number(v)
        else
          state[k] = v as unknown
    },
    setFormItem: (
      state,
      action: {
        payload: { name: string; value: unknown };
      }
    ) => {
      const onChangeName = action.payload.name
      let onChangeValue = action.payload.value
      if (!Number.isNaN(Number(onChangeValue)))
        onChangeValue = Number(onChangeValue)

      state[onChangeName] = onChangeValue
    },
  },
})

// Action creators are generated for each case reducer function

export const cacheReducer = cacheSlice.reducer
export const { setForm, setFormItem } = cacheSlice.actions
