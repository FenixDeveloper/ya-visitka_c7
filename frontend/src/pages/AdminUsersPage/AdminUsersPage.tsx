import React, { FC, useState, useEffect, useRef } from 'react';
import api from '../../utils/api-config';
import styles from './AdminUsersPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Student } from '../../components/Student/Student';
import { Button } from '../../components/Button/Button';
import { TStudent, TStudentsDataFull } from '../../services/types/data';
import { read, utils } from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { validation } from '../../utils/validation';

export const AdminUsersPage: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);
  const [studentsData, setStudentsData] = useState<TStudentsDataFull[]>([]);
  const [students, setStudents] = useState<TStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TStudent[]>([]);
  const [studentsToUpload, setStudentsToUpload] = useState<TStudent[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNtdGhPZlZhbHVlQHlhbmRleC5ydSIsInJvbGUiOiJjdXJhdG9yIiwiaWF0IjoxNjgxNDcxNjE0LCJleHAiOjE2ODIwNzY0MTR9.pAZhCpunPy7S8kz3RNheSoZKyj7tZi-Y78wYaycf82Y';

  
  useEffect( () => {
    const fetchUsers = async () => {
      await api.getUsers(bearerToken, 0, 20, '')
        .then(data => {
          setStudentsData(data.items);
          const studentsFromAPI = data.items.map((student: TStudentsDataFull) => {
            return {
              name: student.name ? student.name : '',
              email: student.email,
              cohort: student.cohort,
              id: student._id,
              fromFile: false,
              validationError: false,
            };
          });
          setFilteredStudents(studentsFromAPI)
          setStudents(studentsFromAPI);          
        })
        .catch((err) => console.log(err.message))
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (studentsToUpload.length === 0) {
      setConfirmationIsOpen(false)
    }
  }, [studentsToUpload]);

  useEffect(() => {
    const virtualStudents = students.filter(student => student.fromFile === true);
    const validationErrors = virtualStudents.some((student) => student.validationError);
    if (validationErrors) {
      setSaveButtonDisabled(true);
    } else {
      setSaveButtonDisabled(false);
    }
  }, [students]);


  //отбор студентов по критерию фильтрации
  const filterStudent = (student: TStudent, substring: string) => {
    if (student.name === undefined) {
      if (student.cohort.toLowerCase().includes(substring.toLowerCase())
          || student.email.toLowerCase().includes(substring.toLowerCase())
      ) {
        return true;
      }
    } else {
      if (student.cohort.toLowerCase().includes(substring.toLowerCase())
    || student.email.toLowerCase().includes(substring.toLowerCase())
    || student.name.toLowerCase().includes(substring.toLowerCase())) {
        return true;
      }
    } 
    return false;
  }
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterResult = students
      .filter(student => {
        if (e.target.value === '') {
          return students;
        }
        return filterStudent(student, e.target.value);
      });

    setQuery(e.target.value);
    setFilteredStudents(filterResult);
  }

  const onUploadFileButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileAsync = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files !== null ? target.files[0] : null;
    const reader = new FileReader();
    reader.onload = function() {
      const data = reader.result;
      const workbook = read(data);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];      
      const arrayOfRows = utils.sheet_to_json(sheet, { header: 1 }) as [string, string][];
      const filteredArrayOfRows = arrayOfRows.filter((row) => {
        if (row[0]) {
          return true;
        } else {
          return false;
        }
      })
      const studentsFromFile = filteredArrayOfRows.map((row) => {        
        const validationErrorMessage = validation.isEmail(row[0].toString());
        if (validationErrorMessage !== '') {
          return {email: row[0].toString(), cohort: row[1].toString(), id: uuidv4(), name: '', fromFile: true, validationError: true}
        } else {
          return {email: row[0].toString(), cohort: row[1].toString(), id: uuidv4(), name: '', fromFile: true, validationError: false}
        }
      });
      setStudentsToUpload(studentsFromFile);
      setStudents([...students].concat(studentsFromFile));
      setFilteredStudents([...filteredStudents.concat(studentsFromFile)]);
      setConfirmationIsOpen(true);
      target.value = '';
    };
    reader.readAsArrayBuffer(file as Blob);
  }

  const handleStudentDeleteClick = (id: string) => {
    setStudents(students.filter((student) => {
      return student.id !== id
    }));
    setFilteredStudents(filteredStudents.filter((student) => {
      return student.id !== id
    }));
    setStudentsToUpload(studentsToUpload.filter((student)=> {
      return student.id !== id
    }));
  }

  const handleUpdate = (student: TStudent) => {
    const studentsCopy = [...students];
    const studentToUpdate = studentsCopy.find((user) => user.id === student.id);
    if (studentToUpdate) {
      if (student.fromFile) {
        studentToUpdate.email = student.email;
        studentToUpdate.cohort = student.cohort;
      } else {
        api.putUsers(bearerToken, {email: student.email, cohort: student.cohort}, student.id)
          .then(student => {
            studentToUpdate.email = student[0].email;
            studentToUpdate.cohort = student[0].cohort;
          })
      }
      setStudents(studentsCopy);
    }    
  }

  const handleClearUploadCandidates = () => {
    const filteredStudentsCopy = [...filteredStudents];
    const studentsWithoutUpload = filteredStudentsCopy.filter((student) => student.fromFile === false);
    setStudents(studentsWithoutUpload);
    setFilteredStudents(studentsWithoutUpload);
    setStudentsToUpload([]);
    //setConfirmationIsOpen(false);
  }

  const updateUser = async (accessToken: string, student: TStudent, isExisting: boolean, failedUploadsArr: TStudent[]) => {
    if (isExisting) {
      await api.putUsers(accessToken, {email: student.email, cohort: student.cohort}, student.id)
        .catch((err) => {
          console.log(err.message); 
          failedUploadsArr.push(student)
        });
    }
    else {
      await api.postUsers(accessToken, {email: student.email, cohort: student.cohort})
        .catch((err) => {
          console.log(err.message);
          failedUploadsArr.push(student)
        });
    }
  }

  const handleSave = async () => {
    const virtualStudents = students.filter(student => student.fromFile === true);
    const failedToUpload: TStudent[] = [];
    //массив промисов для отправки данных о студентах построчно
    const uploadArray = virtualStudents.map((virtualStudent) => {
      const studentToEdit = studentsData.find((existingStudent) => {
        return existingStudent.email.toLowerCase() === virtualStudent.email.toLowerCase();
      });
      const isExisting = !!studentToEdit;
      return updateUser(bearerToken, virtualStudent, isExisting, failedToUpload);
    });
    Promise.allSettled(uploadArray)
      .then(async responses => {
        //запрос обновленных данных с сервера
        await api.getUsers(bearerToken, 0, 20, '')
          .then(data => {
            const studentsFromAPI = data.items.map((student: TStudentsDataFull) => {
              return {
                name: student.name ? student.name : '',
                email: student.email,
                cohort: student.cohort,
                id: student._id,
                fromFile: false
              };
            })
            setFilteredStudents(failedToUpload.concat(studentsFromAPI));   
            setStudents(failedToUpload.concat(studentsFromAPI));
            if (failedToUpload.length === 0) {
              setStudentsToUpload([]);
            }
          });  
      });  
  }

  const virtualStudentsToRender = filteredStudents.map((student) => {
    if (student.fromFile) {
      return (<Student 
        key={student.id}
        cohort={student.cohort}
        name={student.name ? student.name : ''}
        email={student.email}
        id={student.id}
        fromFile={student.fromFile}
        validationError={student.validationError}
        handleUpdate={handleUpdate}
        handleDelete={() => handleStudentDeleteClick(student.id)}
      />)
    }
  });

  const studentsToRender = filteredStudents.map((student) => {
    if (student.fromFile === false) {
      return(<Student 
        key={student.id}
        cohort={student.cohort}
        name={student.name ? student.name : ''}
        email={student.email}
        id={student.id}
        fromFile={student.fromFile}
        validationError={student.validationError}
        handleUpdate={handleUpdate}
      />)
    }
  });

  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <NavLink 
          to = '/admin/users' end
          className={({ isActive }) =>
            isActive 
              ? styles.link + ' ' + styles.link_active
              : styles.link
          }
        >
          студенты
        </NavLink>
        <NavLink to = '/admin' end 
          className={({ isActive }) =>
            isActive 
              ? styles.link + ' ' + styles.link_active
              : styles.link
          }
        >
          комментарии
        </NavLink>
      </div>
      <div className={styles.content}> 
        <div className={styles.students}>
          <p className={styles.filter_text}>Фильтровать</p>
          <input 
            className={styles.filter_input}
            type="text" 
            onChange={handleFilterChange}
            value={query}
            placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
          />
          {query !== '' &&
          <button 
            className={styles.filter_clear} 
            type='reset' 
            onClick={() => {
              setQuery('')
              setFilteredStudents(students);
            }} 
          />}
          <div className={styles.table_header}>
            <p className={styles.table_header_text}>Номер когорты</p>
            <p className={styles.table_header_text}>E-mail</p>
            <p className={styles.table_header_text}>Имя и фамилия студента</p>
          </div>
          <ul className={styles.students_list}>
            {virtualStudentsToRender}
            {studentsToRender}
          </ul>
        </div>
        <div className={styles.upload}>
          <h2 className={styles.upload_heading}>Добавить студентов</h2>
          <p className={styles.upload_text}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
          <input 
            ref={inputFile} 
            type="file" 
            className={styles.file_input}
            onChange={handleFileAsync}
            accept=".csv,.xlsx" />
          <Button size='small' onClick={onUploadFileButtonClick} >Выберите файл</Button>
          {confirmationIsOpen && 
          <>
            <p className={styles.confirmation_text}>
              Проверьте, что загруженные данные корректны и сохраните их или удалите и загрузите заново.
            </p>
            <div className={styles.confirmation_buttons}>
              <button 
                type='button' 
                className={styles.button_delete}
                onClick={handleClearUploadCandidates}
              >Удалить</button>
              <button 
                type='button'
                className={styles.button_submit}
                onClick={handleSave}
                disabled={saveButtonDisabled}
              >Сохранить</button>
            </div>
          </>}
        </div>
      </div>
    </section>
  );
}
