import React, { FC, useState, useEffect, useRef } from 'react';
import api from '../../utils/api-config';
import styles from './AdminUsersPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Student } from '../../components/Student/Student';
import { Button } from '../../components/Button/Button';
import { IStudentsData } from '../../services/types/data';
import { read, utils } from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

export const AdminUsersPage: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [studentsData, setStudentsData] = useState<IStudentsData[]>([]);
  const [filterResult, setFilterResult] = useState<IStudentsData[]>([]);
  const [studentsToUpload, setStudentsToUpload] = useState<{email: string, cohort: string, id: string}[]>([]);
  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect( () => {
    const fetchUsers = async () => {
      await api.getUsers('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNtdGhPZlZhbHVlQHlhbmRleC5ydSIsInJvbGUiOiJjdXJhdG9yIiwiaWF0IjoxNjgxNDcxNjE0LCJleHAiOjE2ODIwNzY0MTR9.pAZhCpunPy7S8kz3RNheSoZKyj7tZi-Y78wYaycf82Y', 0, 20, '')
        .then(data => {
          setStudentsData(data.items)
          setFilterResult(data.items)})
    }
    fetchUsers();
  }, []);

  //отбор студентов по критерию фильтрации
  const filterStudent = (student: IStudentsData, substring: string) => {
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = studentsData
      .filter(student => {
        if (e.target.value === '') {
          return studentsData
        }
        return filterStudent(student, e.target.value);
      });
    setQuery(e.target.value);
    setFilterResult(result);
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
        return {email: row[0], cohort: row[1], id: uuidv4()}
      })
      setStudentsToUpload(students);
    };
    reader.readAsArrayBuffer(file as Blob);
  }

  const handleDeleteClick = (id: string) => {
    setStudentsToUpload(studentsToUpload.filter((student) => {
      return student.id !== id
    }));
  }

  const handleUpdate = (id: string, fromFile: boolean) => {
    
  }

  const students = filterResult.map((student) => {
    return (<Student 
      key={student._id}
      cohort={student.cohort}
      name={student.name ? student.name : ''}
      email={student.email}
      id={student._id}
      fromFile={false}
      handleUpdate={() => handleUpdate(student._id, false)}
    />)
  });

  const uploadCandidates = studentsToUpload.map((student) => {
    return (<Student 
      key={student.id}
      cohort={student.cohort}
      name='' email={student.email}
      id={student.id}
      fromFile={true}
      handleDelete={() => handleDeleteClick(student.id)}
      handleUpdate={() => handleUpdate(student.id, true)}
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
            //value={query}
            onChange={handleChange}
            placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
          />
          {query !== '' &&
          <button 
            className={styles.filter_clear} 
            type='reset' 
            onClick={() => {
              setQuery('');
              setFilterResult(studentsData)
            }} 
          />}
          <div className={styles.table_header}>
            <p className={styles.table_header_text}>Номер когорты</p>
            <p className={styles.table_header_text}>E-mail</p>
            <p className={styles.table_header_text}>Имя и фамилия студента</p>
          </div>
          <ul className={styles.students_list}>
            {uploadCandidates}
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
        </div>
      </div>
    </section>
  );
}
