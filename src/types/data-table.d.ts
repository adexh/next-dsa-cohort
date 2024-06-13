type TColumn = {
  key: string
  label: string
}

type TColumns = TColumn[];

type ExtractKeys<T extends TColumn[]> = T[number]['key'];

type TRowData<T extends TColumn[]> = {
  [K in ExtractKeys<T>]: string|boolean|number;
};