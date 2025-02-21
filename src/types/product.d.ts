/**
 * 商品类型
 */
interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  reason: string;
  coverUrl: string;
  bannerUrl: string;
  desc: string;
  originalPrice: number;
  stock: number;
  status: string;
  tags?: string;
  curStock: number;
  buyNumber?: number;
  preferentialPrice: number;
  displayType: string;
  distance?: string;
  org: IOrganization;
  cards?: ICard[];
}

interface IProductType {
  key: string;
  title: string;
}

type TProductTypeQuery = TBaseQuery<IProductType[]>;
type TProductsQuery = TBaseQuery<IProduct[]>;
type TProductQuery = TBaseQuery<IProduct>;
