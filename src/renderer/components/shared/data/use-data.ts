export interface ISubscribtion {
  id: string;
  name: string;
  keyVaults: IKeyVoult[];
}

export interface IKeyVoult {
  id: string;
  name: string;
  secrets: ISecret[];
}

export interface ISecret {
  id: string;
  name: string;
  url: string;
}

const generateSubscribtions = (howMany: number): ISubscribtion[] => {
  const subscribtions: ISubscribtion[] = [];
  for (let i = 0; i < howMany; i++) {
    const id = `subid-${i}`;
    subscribtions.push({
      id: id,
      name: 'subscribtion-' + i,
      keyVaults: generateKeyVaults(20, id),
    });
  }
  return subscribtions;
};

const generateKeyVaults = (howMany: number, subscribtionId: string): IKeyVoult[] => {
  const keyVaults: IKeyVoult[] = [];
  for (let i = 0; i < howMany; i++) {
    const id = `${subscribtionId}-vaultid${i}`;
    keyVaults.push({
      id: id,
      name: subscribtionId + 'KeyVault-' + i,
      secrets: generateSecrets(100, id),
    });
  }
  return keyVaults;
};

const generateSecrets = (howMany: number, keyVaultId: string): ISecret[] => {
  const secrets: ISecret[] = [];
  for (let i = 0; i < howMany; i++) {
    secrets.push({
      id: `${keyVaultId}-secretId${i}`,
      name: 'secret-' + i,
      url: 'url',
    });
  }
  return secrets;
};

const useData = (): ISubscribtion[] => generateSubscribtions(10);

export default useData;
