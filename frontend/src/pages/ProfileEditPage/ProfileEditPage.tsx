import React, { FC } from 'react';
import styles from './ProfileEditPage.module.scss';
import { Input } from '../../components/Input/Input';
import { ProfileContext } from '../../services/profileContext';
import { Button } from '../../components/Button/Button';
import { EXAMPLE_DEFAUT_ARR, PATTERN_ARR } from '../../utils/constants';

export const ProfileEditPage: FC = () => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const [nicknameTelegram, setNicknameTelegram] = React.useState<string>('');
  const [nicknameGithub, setNicknameGithub] = React.useState<string>('');
  const [quote, setQuote] = React.useState<string>('');
  const [hobby, setHobby] = React.useState<string>('');
  const [relationship, setRelationship] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');
  const [reason, setReason] = React.useState<string>('');

  const changeNicknameTelegram = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameTelegram(e.target.value);
  }

  const changeNicknameGithub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameGithub(e.target.value);
  }

  const changeQuote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(e.target.value);
  }

  const changeHobby = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHobby(e.target.value);
  }

  const changeRelationship = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRelationship(e.target.value);
  }

  const changeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  }

  const changeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  }

  const uploadFileHobby = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value;
    
    if (file) {
      setProfileState({ ...profileState, formFileHobby: file });
    }
  }

  const uploadFileHome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value;
    
    if (file) {
      setProfileState({ ...profileState, formFileHome: file });
    }
  }

  const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitForm}>
          <Input type='date' label='Дата рождения *' />
          <Input type='select' label='Выберите город *' arrValues={EXAMPLE_DEFAUT_ARR} value={profileState.formSity} />
          <Input type='text' label='Ник в телеграм' value={nicknameTelegram} onChange={changeNicknameTelegram} />
          <Input type='text' label='Ник на гитхабе' value={nicknameGithub} onChange={changeNicknameGithub} />
          <Input type='select' label='Выберите шаблон' arrValues={PATTERN_ARR} value={profileState.formPattern} />
          <Input type='textarea' value={quote} onChange={changeQuote} label='Девиз, цитата' placeholder='Не более 100 символов' />
          <Input type='file' label='Увлечения, досуг, интересы' caption='Рекомендуемый размер фото 230х129' 
            value={profileState.fileHobby} onChange={uploadFileHobby} />
          <Input type='textarea' value={hobby} onChange={changeHobby} placeholder='Не более 300 символов' />
          <Input type='file' label='Семья, статус, домашние животные' caption='Рекомендуемый размер фото 230х129' 
            value={profileState.fileHome} onChange={uploadFileHome} />
          <Input type='textarea' value={relationship} onChange={changeRelationship} placeholder='Не более 300 символов' />
          <Input type='textarea' value={bio} onChange={changeBio} label='Из какой сферы пришёл? Кем работаешь?' placeholder='Не более 300 символов' />
          <Input type='textarea' value={reason} onChange={changeReason} label='Почему решил учиться на веб-разработчика?' placeholder='Не более 300 символов'/>
          <span className={styles.caption}>Поля, отмеченные звездочкой, обязательны для заполнения</span>
          <Button>Сохранить</Button>
        </form>
      </div>
    </>
  );
}
