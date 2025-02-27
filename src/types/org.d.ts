interface IOrganization {
  id: string;
  orgFrontImg?: IImage[];
  orgRoomImg?: IImage[];
  orgOtherImg?: IImage[];
  name: string;
  logo?: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  courses?: ICourse[];
}

type TOrgQuery = TBaseQuery<IOrganization>;

type TOrgsQuery = TBaseQuery<IOrganization[]>;
