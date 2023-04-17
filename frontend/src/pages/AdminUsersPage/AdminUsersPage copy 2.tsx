import React, { FC, useState, useEffect, useRef } from 'react';
import api from '../../utils/api-config';
import styles from './AdminUsersPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Student } from '../../components/Student/Student';
import { Button } from '../../components/Button/Button';
import { TStudent, TStudentsData, TStudentsDataFull } from '../../services/types/data';
import { read, utils } from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

export const AdminUsersPage: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [confirmationIsOpen, setConfirmationIsOpen] = useState<boolean>(false);
  const [studentsData, setStudentsData] = useState<TStudentsDataFull[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TStudentsData[]>([]);
  const [filteredStudentsToUpload, setFilteredStudentsToUpload] = useState<TStudentsData[]>([]);
  const [studentsToUpload, setStudentsToUpload] = useState<TStudentsData[]>([]);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNtdGhPZlZhbHVlQHlhbmRleC5ydSIsInJvbGUiOiJjdXJhdG9yIiwiaWF0IjoxNjgxNDcxNjE0LCJleHAiOjE2ODIwNzY0MTR9.pAZhCpunPy7S8kz3RNheSoZKyj7tZi-Y78wYaycf82Y';

  useEffect( () => {
    const fetchUsers = async () => {
      await api.getUsers(bearerToken, 0, 20, '')
        .then(data => {
          setStudentsData(data.items)
          setFilteredStudents(data.items)})
    }
    fetchUsers();
  }, []);

  //отбор студентов по критерию фильтрации
  const filterStudent = (student: TStudentsData, substring: string) => {
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
    const filterResult = studentsData
      .filter(student => {
        if (e.target.value === '') {
          return studentsData
        }
        return filterStudent(student, e.target.value);
      });
    const typedFilterResult = filterResult.map((student) => {return {cohort: student.cohort, name: student.name, email: student.email, _id: student._id}});

    const virtualFilterResult = studentsToUpload
      .filter(student => {
        if (e.target.value === '') {
          return studentsToUpload
        }
        return filterStudent(student, e.target.value);
      });
    setQuery(e.target.value);
    setFilteredStudentsToUpload(virtualFilterResult);
    setFilteredStudents(typedFilterResult);
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
      const students = arrayOfRows.map((row) => {
        return {email: row[0], cohort: row[1].toString(), _id: uuidv4(), name: ''}
      })
      setStudentsToUpload(students);
      setFilteredStudentsToUpload(students);
      setConfirmationIsOpen(true);
      target.value = '';
    };
    reader.readAsArrayBuffer(file as Blob);
  }

  const handleStudentDeleteClick = (id: string) => {
    setStudentsToUpload(studentsToUpload.filter((student) => {
      return student._id !== id
    }));
    setFilteredStudentsToUpload(filteredStudentsToUpload.filter((student) => {
      return student._id !== id
    }));
  }

  const handleUpdate = (student: TStudent) => {
    if (student.fromFile) {
      const virtualStudents = [...studentsToUpload];
      const studentToUpdate = virtualStudents.find((user) => user._id === student.id);
      if (studentToUpdate) {
        studentToUpdate.email = student.email;
        studentToUpdate.cohort = student.cohort;
        setStudentsToUpload(virtualStudents);
      }
    } else {
      const studentsDataCopy = [...studentsData];
      const studentToUpdate = studentsDataCopy.find((user) => user._id === student.id);
      if (studentToUpdate) {
        api.putUsers(bearerToken, {email: student.email, cohort: student.cohort}, student.id)
          .then(student => {
            studentToUpdate.email = student[0].email;
            studentToUpdate.cohort = student[0].cohort;
            setStudentsData(studentsDataCopy);
          })
      }
    }
  }

  const handleClearUploadCandidates = () => {
    setStudentsToUpload([]);
    setFilteredStudentsToUpload([]);
    setConfirmationIsOpen(false);
  }

  const handleSave = () => {
    const virtualStudents = [...studentsToUpload];
    let failedToUpload: TStudentsData[] = [];
    virtualStudents.forEach(async (virtualStudent) => {
      const studentToEdit = studentsData.find((existingStudent) => {
        return existingStudent.email.toLowerCase() === virtualStudent.email.toLowerCase();
      });
      if (studentToEdit) {
        await api.putUsers(bearerToken, {email: virtualStudent.email, cohort: virtualStudent.cohort}, studentToEdit._id)
          .catch((err) => {
            console.log(err.message); 
            failedToUpload.push(virtualStudent)
            console.log(failedToUpload);
          });
      } else {
        await api.postUsers(bearerToken, {email: virtualStudent.email, cohort: virtualStudent.cohort})
          .catch((err) => {
            console.log(err.message);
            failedToUpload.push(virtualStudent)
          });
      }
    });
    setFilteredStudentsToUpload(failedToUpload);
    api.getUsers(bearerToken, 0, 20, '')
      .then(data => {
        setStudentsData(data.items)
        setFilteredStudents(data.items)});
    //console.log(failedToUpload);
    if (failedToUpload.length === 0) {
      setConfirmationIsOpen(false);
    }
    failedToUpload = [];    
  }

  const students = filteredStudents.map((student) => {
    return (<Student 
      key={student._id}
      cohort={student.cohort}
      name={student.name ? student.name : ''}
      email={student.email}
      id={student._id}
      fromFile={false}
      handleUpdate={handleUpdate}
    />)
  });

  const candidatesForUpload = filteredStudentsToUpload.map((student) => {
    return (<Student 
      key={student._id}
      cohort={student.cohort}
      name='' email={student.email}
      id={student._id}
      fromFile={true}
      handleDelete={() => handleStudentDeleteClick(student._id)}
      handleUpdate={handleUpdate}
    />)
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
              setFilteredStudents(studentsData);
              setFilteredStudentsToUpload(studentsToUpload);
            }} 
          />}
          <div className={styles.table_header}>
            <p className={styles.table_header_text}>Номер когорты</p>
            <p className={styles.table_header_text}>E-mail</p>
            <p className={styles.table_header_text}>Имя и фамилия студента</p>
          </div>
          <ul className={styles.students_list}>
            {candidatesForUpload}
            {students}
          </ul>
        </div>
        <div className={styles.upload}>
          <h2 className={styles.upload_heading}>Добавить студентов</h2>
          <p className={styles.upload_text}>Чтобы добавить новых студентов, загрузите csv или xlsx файл: первая колонка должна содержать email студентов, вторая колонка — номер когорты.</p>
          <input 
            ref={inputFile} 
            type="file" 
            className={styles.file_input}
            onChange={handleFileAsync} />
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
              >Сохранить</button>
            </div>
          </>}
        </div>
      </div>
    </section>
  );
}
