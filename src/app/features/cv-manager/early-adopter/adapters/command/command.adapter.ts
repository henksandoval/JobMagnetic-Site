import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandAdapter {
  transform<TInput, TOutput>(
    data: TInput,
    key: keyof TOutput,
    additionalFields: Partial<TOutput[keyof TOutput]> = {},
    customTransformMethod?: (data: TInput) => Partial<unknown>
  ): TOutput {
    const transformedData = customTransformMethod ? customTransformMethod(data) : { ...data };

    return {
      [key]: {
        ...transformedData,
        ...additionalFields
      },
    } as TOutput;
  }
}
