import React, { FC } from 'react';
import styles from './ProfileEditPage.module.scss';
import { Input } from '../../components/Input/Input';
import { ProfileContext } from '../../services/profileContext';

export const ProfileEditPage: FC = () => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const [nickname, setNickname] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  const changeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value;
    console.log(file);
    
    if (file) {
      setProfileState({ ...profileState, file: file });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <Input type='text' label='Ник на гитхабе' value={nickname} onChange={changeNickname} />
          <Input type='select' label='Выберите город *' />
          <Input type='textarea' value={bio} onChange={changeBio} label='Из какой сферы пришёл? Кем работаешь?' />
          <Input type='date' label='Дата рождения *' />
          <Input type='file' label='Семья, статус, домашние животные' />
        </form>
      </div>
    </>
  );
}
