type TColumn = {
  key: string
  label: string
}

type TColumns = TColumn[];

type ExtractKeys<T extends TColumn[]> = T[number]['key'];

type TRowData<T extends TColumn[]> = {
  [K in ExtractKeys<T>]: string|boolean|number;
};

type TProblem = {
  id: integer,
  problem: string,
  link: string,
  status: boolean
}

type TTopic = {
  id: string,
  name: string,
  problems: TProblem[]
}

type TClass = {
  id: integer,
  topic: string,
  ytlinke: string,
  date: string,
  status: boolean
}

type TTopicClass = {
  id: string,
  name: string,
  classes: TClass[]
}