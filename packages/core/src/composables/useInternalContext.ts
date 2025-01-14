import {
  ComputedRef,
  getCurrentInstance,
  inject,
  InjectionKey,
  WritableComputedRef,
} from 'vue';

import {
  FieldArrayValidator,
  FieldAttrs,
  FieldMeta,
  FieldValidator,
  FormErrors,
  FormTouched,
  FormValues,
  MaybeRef,
  SetFieldArrayValue,
  UseFormSetFieldValue,
} from '../types';

function injectMaybeSelf<T>(
  key: InjectionKey<T>,
  defaultValue: T | undefined = undefined,
): T | undefined {
  const vm = getCurrentInstance() as any;
  return vm?.provides[key as any] || inject(key, defaultValue);
}

export interface InternalContextValues {
  registerField: (
    name: MaybeRef<string>,
    options: { validate?: FieldValidator<any> },
  ) => void;

  registerFieldArray: (
    name: MaybeRef<string>,
    options: {
      validate?: FieldArrayValidator<any>;
      reset: () => void;
    },
  ) => void;

  getFieldValue: <Value>(name: MaybeRef<string>) => WritableComputedRef<Value>;
  getFieldMeta: (name: MaybeRef<string>) => FieldMeta;
  setFieldValue: UseFormSetFieldValue<FormValues>;

  getFieldError: (name: string) => FormErrors<any>;
  getFieldTouched: (name: string) => FormTouched<boolean>;
  getFieldDirty: (name: string) => boolean;
  getFieldAttrs: (name: MaybeRef<string>) => ComputedRef<FieldAttrs>;

  setFieldArrayValue: SetFieldArrayValue;
}

export const InternalContextKey: InjectionKey<InternalContextValues> = Symbol(
  __DEV__ ? 'vorms internal context' : '',
);

export function useInternalContext() {
  const context = injectMaybeSelf(InternalContextKey) as InternalContextValues;
  return context;
}
