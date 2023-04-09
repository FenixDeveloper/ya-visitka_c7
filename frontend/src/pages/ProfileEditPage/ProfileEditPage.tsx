import React, { FC } from 'react';
import styles from './ProfileEditPage.module.scss';
import { Input } from '../../components/Input/Input';
import { ProfileContext } from '../../services/profileContext';
import { Button } from '../../components/Button/Button';
import { EXAMPLE_DEFAUT_ARR, PATTERN_ARR } from '../../utils/constants';

export const ProfileEditPage: FC = () => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const [nicknameTelegram, setNicknameTelegram] = React.useState<string>(profileState.telegram);
  const [nicknameGithub, setNicknameGithub] = React.useState<string>(profileState.github);
  const [quote, setQuote] = React.useState<string>(profileState.quote);
  const [hobby, setHobby] = React.useState<string>(profileState.hobby);
  const [relationship, setRelationship] = React.useState<string>(profileState.relationship);
  const [bio, setBio] = React.useState<string>(profileState.bio);
  const [reason, setReason] = React.useState<string>(profileState.reason);
  const [fileHobbyValue, setFileHobbyValue] = React.useState('');
  const [fileHomeValue, setFileHomeValue] = React.useState('');


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
    setFileHobbyValue(file);
    console.log(file);
    
    if (file) {
      const data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
      setProfileState({ ...profileState, formFileHobby: file });
    }
  }

  const uploadFileHome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value;
    setFileHomeValue(file);
    console.log(file);
    
    if (file) {
      const data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
      setProfileState({ ...profileState, formFileHome: file });
    }
  }

  const submitForm = (
    avatar: string,
    birthday: Date, 
    sity: string, 
    telegram: string, 
    github: string, 
    pattern: string, 
    quote: string,
    fileHobby: string,
    hobby: string, 
    fileHome: string,
    relationship: string, 
    bio: string, 
    reason: string
  ) => {
    //отправка формы на сервер, если запрос прошел успешно, меняем основные поля в стейте
    setProfileState({ ...profileState, avatar, birthday, sity, telegram, github, pattern, quote, 
      fileHobby, hobby, fileHome, relationship, bio, reason });
    console.log(profileState.sity, profileState.birthday, profileState.avatar);
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <Input type='avatar' label='Загрузите фото *' caption='(размер не менее 440х440 пикселей)' />
          <Input type='date' label='Дата рождения *' />
          <Input type='select' label='Выберите город *' arrValues={EXAMPLE_DEFAUT_ARR} value={profileState.sity} />
          <Input type='text' label='Ник в телеграм' value={nicknameTelegram} onChange={changeNicknameTelegram} />
          <Input type='text' label='Ник на гитхабе' value={nicknameGithub} onChange={changeNicknameGithub} />
          <Input type='select' label='Выберите шаблон' arrValues={PATTERN_ARR} value={profileState.pattern} />
          <Input type='textarea' value={quote} onChange={changeQuote} label='Девиз, цитата' placeholder='Не более 100 символов' />
          <Input type='file' label='Увлечения, досуг, интересы' caption='Рекомендуемый размер фото 230х129' onChange={uploadFileHobby} />
          <Input type='textarea' value={hobby} onChange={changeHobby} placeholder='Не более 300 символов' />
          <Input type='file' label='Семья, статус, домашние животные' caption='Рекомендуемый размер фото 230х129' onChange={uploadFileHome} />
          <Input type='textarea' value={relationship} onChange={changeRelationship} placeholder='Не более 300 символов' />
          <Input type='textarea' value={bio} onChange={changeBio} label='Из какой сферы пришёл? Кем работаешь?' placeholder='Не более 300 символов' />
          <Input type='textarea' value={reason} onChange={changeReason} label='Почему решил учиться на веб-разработчика?' placeholder='Не более 300 символов'/>
          <span className={styles.caption}>Поля, отмеченные звездочкой, обязательны для заполнения</span>
          <Button onClick={() => submitForm(
            profileState.formAvatar,
            profileState.formBirthday, 
            profileState.formSity,
            nicknameTelegram,
            nicknameGithub,
            profileState.formPattern,
            quote,
            profileState.fileHobby,
            hobby,
            profileState.formFileHome,
            relationship,
            bio,
            reason
          )}>Сохранить</Button>
        </form>
      </div>
    </>
  );
}
