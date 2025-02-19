interface IStudent {
  id: string;
  tel: string;
  name: string;
  avatar: string;
}

interface IPropChild {
  children: React.ReactNode;
}

interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

type TBaseQuery<T = null> = { [key: string]: { __typename?: 'Query', data: T, page: IPage, code: number, message: string } };
