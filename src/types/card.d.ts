/**
 * 个人消费卡
 */
interface ICardRecord {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  residueTime: number; // 剩余次数
  status: string;
  card:ICard;
  org: IOrganization;
}

type TCardRecordsQuery = TBaseQuery<ICardRecord[]>;
