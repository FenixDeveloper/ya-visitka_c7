import React, { FC } from 'react';
import styles from './profile-edit-page.module.scss';
import { Input } from '../../components/input/input';
import { ProfileContext } from '../../services/profile-context';
import { Button } from '../../components/button/button';
import { EXAMPLE_DEFAUT_ARR, PATTERN_ARR } from '../../utils/constants';
import { validation } from '../../utils/validation';

export const ProfileEditPage: FC = () => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const [nicknameTelegram, setNicknameTelegram] = React.useState<string>(profileState.telegram);
  const [nicknameGithub, setNicknameGithub] = React.useState<string>(profileState.github);
  const [quote, setQuote] = React.useState<string>(profileState.quote);
  const [hobby, setHobby] = React.useState<string>(profileState.hobby);
  const [relationship, setRelationship] = React.useState<string>(profileState.relationship);
  const [bio, setBio] = React.useState<string>(profileState.bio);
  const [reason, setReason] = React.useState<string>(profileState.reason);
  const [fileHobbyValue, setFileHobbyValue] = React.useState<File>();
  const [fileHomeValue, setFileHomeValue] = React.useState<File>();
  const [githubErrorMessage, setGithubErrorMessage] = React.useState('');
  const [telegramErrorMessage, setTelegramErrorMessage] = React.useState('');
  const [quoteErrorMessage, setQuoteErrorMessage] = React.useState('');
  const [bioErrorMessage, setBioErrorMessage] = React.useState('');
  const [hobbyErrorMessage, setHobbyErrorMessage] = React.useState('');
  const [relationshipErrorMessage, setRelationshipErrorMessage] = React.useState('');
  const [reasonErrorMessage, setReasonErrorMessage] = React.useState('');
  const [fileHobbyErrorMessage, setFileHobbyErrorMessage] = React.useState('');
  const [fileHomeErrorMessage, setFileHomeErrorMessage] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const handleGithubLink = async (nickname: string) => {
    if (nickname === '') {
      setGithubErrorMessage('');
    } else {
      const githubValidationResult = await validation.isExistUserGithub(nickname);
      setGithubErrorMessage(githubValidationResult);
    }
  };

  const changeNicknameTelegram = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameTelegram(e.target.value);
    setTelegramErrorMessage(e.target.value ? validation.isTelegramLink(e.target.value) : '');
  };

  const changeNicknameGithub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameGithub(e.target.value);
    handleGithubLink(e.target.value);
  };

  const changeQuote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(e.target.value);
    setQuoteErrorMessage(e.target.value ? validation.checkLength(e.target.value, 5, 100) : '');
  };

  const changeHobby = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHobby(e.target.value);
    setHobbyErrorMessage(e.target.value ? validation.checkLength(e.target.value, 5, 300) : '');
  };

  const changeRelationship = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRelationship(e.target.value);
    setRelationshipErrorMessage(
      e.target.value ? validation.checkLength(e.target.value, 5, 300) : '',
    );
  };

  const changeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    setBioErrorMessage(e.target.value ? validation.checkLength(e.target.value, 3, 300) : '');
  };

  const changeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
    setReasonErrorMessage(e.target.value ? validation.checkLength(e.target.value, 5, 300) : '');
  };

  const uploadFileHobby = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFileHobbyValue(file);
      setFileHobbyErrorMessage(file ? validation.checkPhotoSize(file, 25165824) : '');
      console.log(file);
    
      const data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
      setProfileState({ ...profileState, formFileHobby: file });
    }
  };

  const uploadFileHome = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFileHomeValue(file);
      setFileHomeErrorMessage(file ? validation.checkPhotoSize(file, 25165824) : '');
      console.log(file);

      const data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
      setProfileState({ ...profileState, formFileHome: file });
    }
  };

  const submitForm = (
    avatar: string,
    birthday: Date,
    sity: string,
    telegram: string,
    github: string,
    pattern: string,
    quote: string,
    fileHobby: File,
    hobby: string,
    fileHome: File,
    relationship: string,
    bio: string,
    reason: string,
  ) => {
    //отправка формы на сервер, если запрос прошел успешно, меняем основные поля в стейте
    setProfileState({
      ...profileState,
      avatar,
      birthday,
      sity,
      telegram,
      github,
      pattern,
      quote,
      fileHobby,
      hobby,
      fileHome,
      relationship,
      bio,
      reason,
    });
  };

  React.useEffect(() => {
    if (
      telegramErrorMessage ||
      githubErrorMessage ||
      quoteErrorMessage ||
      bioErrorMessage ||
      relationshipErrorMessage ||
      hobbyErrorMessage ||
      reasonErrorMessage ||
      fileHomeErrorMessage ||
      fileHobbyErrorMessage
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [
    telegramErrorMessage,
    githubErrorMessage,
    quoteErrorMessage,
    bioErrorMessage,
    relationshipErrorMessage,
    hobbyErrorMessage,
    reasonErrorMessage,
    fileHomeErrorMessage,
    fileHobbyErrorMessage,
  ]);

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
          <Input type="avatar" label="Загрузите фото *" caption="(размер не менее 440х440)" />
          <Input type="date" label="Дата рождения *" />
          <Input
            type="select"
            label="Выберите город *"
            arrValues={EXAMPLE_DEFAUT_ARR}
            value={profileState.sity}
          />
          <Input
            type="text"
            label="Ник в телеграм"
            value={nicknameTelegram}
            onChange={changeNicknameTelegram}
            errorMessage={telegramErrorMessage}
          />
          <Input
            type="text"
            label="Ник на гитхабе"
            value={nicknameGithub}
            onChange={changeNicknameGithub}
            errorMessage={githubErrorMessage}
          />
          <Input
            type="select"
            label="Выберите шаблон"
            arrValues={PATTERN_ARR}
            value={profileState.pattern}
          />
          <Input
            type="textarea"
            value={quote}
            onChange={changeQuote}
            label="Девиз, цитата"
            placeholder="Не более 100 символов"
            errorMessage={quoteErrorMessage}
          />
          <Input
            type="file"
            label="Увлечения, досуг, интересы"
            caption="Рекомендуемый размер фото 230х129"
            onChange={uploadFileHobby}
            errorMessage={fileHobbyErrorMessage}
          />
          <Input
            type="textarea"
            value={hobby}
            onChange={changeHobby}
            placeholder="Не более 300 символов"
            errorMessage={hobbyErrorMessage}
          />
          <Input
            type="file"
            label="Семья, статус, домашние животные"
            caption="Рекомендуемый размер фото 230х129"
            onChange={uploadFileHome}
            errorMessage={fileHomeErrorMessage}
          />
          <Input
            type="textarea"
            value={relationship}
            onChange={changeRelationship}
            placeholder="Не более 300 символов"
            errorMessage={relationshipErrorMessage}
          />
          <Input
            type="textarea"
            value={bio}
            onChange={changeBio}
            label="Из какой сферы пришёл? Кем работаешь?"
            placeholder="Не более 300 символов"
            errorMessage={bioErrorMessage}
          />
          <Input
            type="textarea"
            value={reason}
            onChange={changeReason}
            label="Почему решил учиться на веб-разработчика?"
            placeholder="Не более 300 символов"
            errorMessage={reasonErrorMessage}
          />
          <span className={styles.caption}>
            Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения
          </span>
          <Button
            disabled={!isValid}
            onClick={() =>
              submitForm(
                profileState.formAvatar,
                profileState.formBirthday,
                profileState.formCity,
                nicknameTelegram,
                nicknameGithub,
                profileState.formPattern,
                quote,
                profileState.fileHobby,
                hobby,
                profileState.formFileHome,
                relationship,
                bio,
                reason,
              )
            }>
            Сохранить
          </Button>
        </form>
      </div>
    </>
  );
};
