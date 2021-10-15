import secretsJson from '../../../../../assets/secrets.json';

export interface ISubscribtion {
  id: string;
  name: string;
  keyVaults: IKeyVoult[];
}

export interface IKeyVoult {
  id: string;
  name: string;
  subscribtion: ISubscribtion;
  secrets: ISecret[];
}

export interface ISecret {
  id: string;
  name: string;
  url: string;
  keyVault: IKeyVoult;
}

const enrichData = (secretsJson: ISubscribtion[]): ISubscribtion[] => {
  secretsJson.forEach(sub => {
    sub.keyVaults.forEach(keyVault => {
      keyVault.subscribtion = sub;
      keyVault.secrets.forEach(secret => {
        secret.keyVault = keyVault;
      });
    });
  });
  return secretsJson;
}

const useData = (): ISubscribtion[] => {
  const data = secretsJson as any;
  const enricedData = enrichData(data.subscriptions as ISubscribtion[]);
  console.log(enricedData);

  return enricedData;
}

export default useData;
