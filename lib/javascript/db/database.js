// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, query, where, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQRIT2tpNRKu9hleY2y7XHil4qxRyFGv8",
  authDomain: "n--bbang.firebaseapp.com",
  projectId: "n--bbang",
  storageBucket: "n--bbang.appspot.com",
  messagingSenderId: "313705713464",
  appId: "1:313705713464:web:1b77174326d991ce043bcd",
  measurementId: "G-3JX3L8VV3C",
  databaseURL: "https://n--bbang-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();
export const Insert = async  (key, value) => {
    try {
        const collectionRef = collection(db, key);
        const docRef = doc(collectionRef);
        
        const updatedData = {
          ...value,
          sq: docRef.id
        };
        
        await setDoc(docRef, updatedData);
        //console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        //console.error("Error adding document: ", e);
      }
}

export const Select = async (key) => {
  try {
    const querySnapshot = await getDocs(collection(db, key));
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  } catch (error) {
    //console.error("Error retrieving documents: ", error);
    throw error;
  }
};

export const Delete = async  () => {

}

export const Update = async (key, field, comparisonValue, updatedField, updatedValue) => {
  try {
    const q = query(collection(db, key), where(field, "==", comparisonValue));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach( async (docSnapshot) => {
      const docRef = doc(db, key, docSnapshot.id);
      
      await updateDoc(docRef, {
        [updatedField]: updatedValue
      });
      
      console.log("문서 업데이트가 성공적으로 완료되었습니다.");
    });
  } catch (error) {
    alert('오류발생 :',error);
    return
  }
}

export const fileUpload = async  (file, date) => {
  try {
    // 현재 날짜 정보 가져오기
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    // 현재 년도 폴더 참조 생성
    
  
    const yearRef = ref(storage, `${currentYear}`);
    
    // 폴더 존재 여부 확인
    try {
      await getMetadata(yearRef);
      // 이미 폴더가 존재하는 경우
      console.log(`"${currentYear}" 폴더가 이미 존재합니다.`);

       // 파일 업로드
       const filename = `${date}`;
       const fileRef = ref(yearRef, filename);

        await uploadBytes(fileRef, file);
        console.log('파일이 성공적으로 업로드되었습니다.');
        // 다운로드 URL 가져오기
        const downloadURL = await getDownloadURL(fileRef);

      // 다운로드 URL 반환
      return downloadURL;
    } catch (error) {
      // 폴더가 존재하지 않는 경우
      if (error.code === 'storage/object-not-found') {
        console.log(`"${currentYear}" 폴더가 없습니다. 폴더를 생성합니다.`);
        
        try {
          // 폴더 생성
          await uploadBytes(ref(storage, `${currentYear}/placeholder.txt`), new Uint8Array());
          //console.log(`"${currentYear}" 폴더가 생성되었습니다.`);
          // 여기에서 파일 업로드 또는 다른 작업 수행

          // 파일 업로드
          const filename = `${date}`;
          const fileRef = ref(yearRef, filename);

          await uploadBytes(fileRef, file);
          //console.log('파일이 성공적으로 업로드되었습니다.');
          // 다운로드 URL 가져오기
          const downloadURL = await getDownloadURL(fileRef);
          return downloadURL;
        } catch (error) {
          //console.error(`"${currentYear}" 폴더 생성 중 오류가 발생했습니다.`, error);
        }
      } else {
        console.error('폴더 확인 중 오류가 발생했습니다.', error);
        throw error;
      }
    }

    // 파일 업로드 또는 다른 작업 수행

  } catch (error) {
    console.error('파일 업로드 중 오류가 발생했습니다.', error);
    throw error;
  }
}


export const doAsyncWork = () => {
  return asyncTask1()
    .then(result1 => {
      // 첫 번째 비동기 작업의 결과를 가지고 다음 작업 수행
      return asyncTask2(result1);
    })
    .then(result2 => {
      // 두 번째 비동기 작업의 결과를 가지고 다음 작업 수행
      return asyncTask3(result2);
    })
    .catch(error => {
      // 에러 처리
      console.error("Error:", error);
      throw error;
    });
};

