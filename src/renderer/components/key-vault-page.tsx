import { TextField } from '@fluentui/react';
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

  const getSubscribtions = (): ISubscribtion[] => {
    return data.filter((sub) => sub.name.includes(subScribtionSearchTerm) || selectedSubscribtions.indexOf(sub.id) !== -1);
  };

  const getKeyVaults = (): IKeyVoult[] => {
    return getSubscribtions()
      .filter((sub) => selectedSubscribtions.indexOf(sub.id) !== -1)
      .flatMap((sub) => sub.keyVaults)
      .filter((keyVaults) => keyVaults.name.includes(keyVaultSearchTerm) || selectedKeyVaults.indexOf(keyVaults.id) !== -1);
  };

  const getSecrets = (): ISecret[] => {
    return getKeyVaults()
      .filter((keyVault) => selectedKeyVaults.indexOf(keyVault.id) !== -1)
      .flatMap((keyVault) => keyVault.secrets)
      .filter((secrets) => secrets.name.includes(secretSearchTerm));
  };

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
          onSelect={setSelectedKeyVaults}
        />
        <DataList
          columnName="Secret"
          data={getSecrets().map((keyVault) => ({ key: keyVault.id, name: keyVault.name }))}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}
