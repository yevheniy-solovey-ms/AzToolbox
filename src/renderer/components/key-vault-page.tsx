import { IGroup, TextField } from '@fluentui/react';
import React, { useState } from 'react';
import { DataList } from './shared/data-list';
import useData, { IKeyVoult, ISecret, ISubscribtion } from './shared/data/use-data';

export default function KeyVaultPage() {
  const data = useData();

  const [selectedSubscribtions, setSelectedSubscribtions] = useState<string[]>([]);
  const [selectedKeyVaults, setSelectedKeyVaults] = useState([] as string[]);

  const [subScribtionSearchTerm, setSubScribtionSearchTerm] = useState('');
  const [keyVaultSearchTerm, setKeyVaultSearchTerm] = useState('');
  const [secretSearchTerm, setSecretSearchTerm] = useState('');

  const getSubscribtions = (onlySelected: boolean = false): ISubscribtion[] => {
    return data
    .filter((sub) => sub.name.includes(subScribtionSearchTerm) || selectedSubscribtions.indexOf(sub.id) !== -1)
    .filter((sub) => !onlySelected || selectedSubscribtions.indexOf(sub.id) !== -1);
  };

  const getKeyVaults = (onlySelected: boolean = false): IKeyVoult[] => {
    const keyVault = getSubscribtions(true)
    .flatMap((sub) => { return sub.keyVaults;})
    .filter((keyVaults) => keyVaults.name.includes(keyVaultSearchTerm) || selectedKeyVaults.indexOf(keyVaults.id) !== -1)
    .filter((keyVault) => !onlySelected || selectedKeyVaults.indexOf(keyVault.id) !== -1);

    return keyVault;
  };

  const getSecrets = (): ISecret[] => {
    return getKeyVaults(true)
      .flatMap((keyVault) => keyVault.secrets)
      .filter((secrets) => secrets.name.includes(secretSearchTerm));
  };

  const getKeyVaultsGroups = (keyVaults: IKeyVoult[]): IGroup[] | undefined => {
    if (!keyVaults.length) return undefined;

    const groups: IGroup[] = [];
    let startIndex = 0;
    let currentGroup = keyVaults[0].subscribtion.name;
    let count = 0;

    keyVaults.forEach((vault) => {
      count++;
      if (vault.subscribtion.name !== currentGroup) {
        groups.push({
          key: currentGroup,
          name: currentGroup,
          startIndex: startIndex,
          count: count - 1
        });

        startIndex += count - 1;
        currentGroup = vault.subscribtion.name;
        count=1;
      }
    });

    // the last group should be added after loop
    groups.push({
      key: currentGroup,
      name: currentGroup,
      startIndex: startIndex,
      count: keyVaults.length - startIndex
    });

    console.log('keyg', groups);

    return groups;
  }

  const getSecretGroups = (secrets: ISecret[]): IGroup[] | undefined => {
    if (!secrets.length) return undefined;

    const groups: IGroup[] = [];
    let startIndex = 0;
    let currentGroup = secrets[0].keyVault.name;
    let count = 0;

    secrets.forEach((secret) => {
      count++;
      if (secret.keyVault.name !== currentGroup) {
        groups.push({
          key: currentGroup,
          name: currentGroup,
          startIndex: startIndex,
          count: count - 1
        });

        startIndex += count - 1;
        currentGroup = secret.keyVault.name;
        count=1;
      }
    });

    // the last group should be added after loop
    groups.push({
      key: currentGroup,
      name: currentGroup,
      startIndex: startIndex,
      count: secrets.length - startIndex
    });

    console.log(groups);


    return groups;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '5vh' }}>
        <TextField
          value={subScribtionSearchTerm}
          onChange={(_, value) => {
            setSubScribtionSearchTerm(value ?? '');
          }}
          placeholder="Search for Subscribtion"
          styles={{ root: { flexGrow: 1 } }}
        />
        <TextField
          value={keyVaultSearchTerm}
          onChange={(_, value) => {
            setKeyVaultSearchTerm(value ?? '');
          }}
          placeholder="Search for KeyVault"
          styles={{ root: { flexGrow: 1 } }}
        />
        <TextField
          value={secretSearchTerm}
          onChange={(_, value) => {
            setSecretSearchTerm(value ?? '');
          }}
          placeholder="Search for Secret"
          styles={{ root: { flexGrow: 1 } }}
        />
      </div>
      <div style={{ width: '100vw', height: '95vh', display: 'flex', justifyContent: 'center', flexGrow: 1, overflow: 'auto' }}>
        <DataList
          columnName="Subscribtion"
          data={getSubscribtions().map((subscribtion) => ({ key: subscribtion.id, name: subscribtion.name }))}
          onSelect={setSelectedSubscribtions}
          />
        <DataList
          columnName="KeyVault"
          data={getKeyVaults().map((keyVault) => ({ key: keyVault.id, name: keyVault.name }))}
          groups={getKeyVaultsGroups(getKeyVaults())}
          onSelect={setSelectedKeyVaults}
          />
        <DataList
          columnName="Secret"
          data={getSecrets().map((keyVault) => ({ key: keyVault.id, name: keyVault.name }))}
          groups={getSecretGroups(getSecrets())}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}
