interface IWxConfig {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

type TWxConfigQuery = TBaseQuery<IWxConfig>;
