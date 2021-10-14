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

const generateSubscribtions = (howMany: number): ISubscribtion[] => {
  const subscribtions: ISubscribtion[] = [];
  for (let i = 0; i < howMany; i++) {
    const subscribtion = {
      id: `subid-${i}`,
      name: 'subscribtion-' + i,
    } as ISubscribtion;
    subscribtion.keyVaults = generateKeyVaults(20, subscribtion);
    subscribtions.push(subscribtion);
  }
  return subscribtions;
};

const generateKeyVaults = (howMany: number, subscribtion: ISubscribtion): IKeyVoult[] => {
  const keyVaults: IKeyVoult[] = [];
  for (let i = 0; i < howMany; i++) {
    const keyVault = {
      id: `${subscribtion.id}-vaultid${i}`,
      name: subscribtion.name + 'KeyVault-' + i,
      subscribtion: subscribtion,
    } as IKeyVoult;
    keyVault.secrets = generateSecrets(100, keyVault);
    keyVaults.push(keyVault);
  }
  return keyVaults;
};

const generateSecrets = (howMany: number, keyVault: IKeyVoult): ISecret[] => {
  const secrets: ISecret[] = [];
  for (let i = 0; i < howMany; i++) {
    secrets.push({
      id: `${keyVault.id}-secretId${i}`,
      name: 'secret-' + i,
      url: 'url',
      keyVault: keyVault,
    });
  }
  return secrets;
};

const useData = (): ISubscribtion[] => generateSubscribtions(10);

export default useData;
