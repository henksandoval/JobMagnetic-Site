import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandAdapter {
  transform<TInput, TOutput>(
    data: TInput,
    key: string,
    additionalFields: Partial<TOutput> = {},
    customTransformMethod?: (data: TInput) => Partial<TOutput>
  ): Record<string, TOutput> {
    const transformedData = customTransformMethod ? customTransformMethod(data) : { ...data };

    return {
      [key]: {
        ...transformedData,
        ...additionalFields
      },
    } as Record<string, TOutput>;
  }
}
